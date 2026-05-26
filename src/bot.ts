import { Telegraf, Context } from 'telegraf';
import express, { Express } from 'express';
import config from './config';
import { databaseManager } from './database';
import { userManager } from './UserManager';
import { quizManager } from './QuizManager';
import { User } from './types';

const bot = new Telegraf(config.telegram.token);
const app: Express = express();

app.use(express.json());

// Middleware to check if user is approved
const isUserApproved = async (ctx: Context, next: any) => {
  const userId = ctx.from?.id;
  if (!userId) {
    return ctx.reply('Unable to identify user.');
  }

  const isApproved = await userManager.isUserApproved(userId);
  if (!isApproved && userId !== config.admin.userId) {
    return ctx.reply(
      '❌ You are not approved to use this bot. Your request is pending admin approval.'
    );
  }

  await next();
};

// Middleware to check if user is admin
const isAdmin = async (ctx: Context, next: any) => {
  const userId = ctx.from?.id;
  if (userId !== config.admin.userId) {
    return ctx.reply('❌ You do not have permission to use this command.');
  }
  await next();
};

// ============ START COMMAND ============
bot.start(async (ctx) => {
  const userId = ctx.from?.id;
  if (!userId) return ctx.reply('Unable to identify user.');

  const userExists = await userManager.userExists(userId);

  if (!userExists) {
    const newUser: User = {
      telegram_id: userId,
      username: ctx.from?.username,
      first_name: ctx.from?.first_name,
      last_name: ctx.from?.last_name,
      status: 'pending',
    };

    await userManager.addUser(newUser);

    return ctx.reply(
      '👋 Welcome! Your request for access has been submitted and is pending admin approval. You will be notified once approved.'
    );
  }

  const user = await userManager.getUserById(userId);

  if (user?.status === 'pending') {
    return ctx.reply('⏳ Your access request is still pending admin approval. Please wait.');
  }

  if (user?.status === 'denied') {
    return ctx.reply('❌ Your access request has been denied.');
  }

  ctx.reply(
    '✅ Welcome back! Use /quizzes to see available quizzes or /help for more options.'
  );
});

// ============ HELP COMMAND ============
bot.command('help', async (ctx) => {
  const userId = ctx.from?.id;
  const isAdminUser = userId === config.admin.userId;

  let helpText = `
📚 *Educational Bot - Help*

*User Commands:*
/quizzes - View all available quizzes
/help - Show this message

`;

  if (isAdminUser) {
    helpText += `
*Admin Commands:*
/pending_users - View users pending approval
/approve <user_id> - Approve a user
/deny <user_id> - Deny a user
`;
  }

  ctx.replyWithMarkdown(helpText);
});

// ============ QUIZ COMMANDS ============
bot.command('quizzes', isUserApproved, async (ctx) => {
  try {
    const quizzes = await quizManager.getAllQuizzes();

    if (quizzes.length === 0) {
      return ctx.reply('📭 No quizzes available yet.');
    }

    let message = '📋 *Available Quizzes:*\n\n';
    quizzes.forEach((quiz) => {
      const questionCount = quiz.questions.length;
      message += `📌 *${quiz.title}* (ID: ${quiz.id})\n`;
      message += `   ${quiz.description || 'No description'}\n`;
      message += `   Questions: ${questionCount}\n\n`;
    });

    message += 'Use /take_quiz <id> to start a quiz.';
    ctx.replyWithMarkdown(message);
  } catch (error) {
    ctx.reply('❌ Error fetching quizzes. Please try again.');
    console.error('Error in quizzes command:', error);
  }
});

// ============ ADMIN COMMANDS ============
bot.command('pending_users', isAdmin, async (ctx) => {
  try {
    const pendingUsers = await userManager.getPendingUsers();

    if (pendingUsers.length === 0) {
      return ctx.reply('✅ No pending user requests.');
    }

    let message = '👥 *Pending User Requests:*\n\n';
    pendingUsers.forEach((user) => {
      const name = user.first_name || user.username || 'Unknown';
      message += `👤 ${name} (ID: ${user.telegram_id})\n`;
      message += `   Username: @${user.username || 'N/A'}\n`;
      message += `   Requested: ${new Date(user.requested_at || '').toLocaleString()}\n`;
      message += `   /approve ${user.telegram_id} | /deny ${user.telegram_id}\n\n`;
    });

    ctx.replyWithMarkdown(message);
  } catch (error) {
    ctx.reply('❌ Error fetching pending users.');
    console.error('Error in pending_users command:', error);
  }
});

bot.command('approve', isAdmin, async (ctx) => {
  const args = ctx.message?.text?.split(' ') || [];
  const userId = parseInt(args[1]);

  if (isNaN(userId)) {
    return ctx.reply('Usage: /approve <user_id>');
  }

  try {
    const success = await userManager.approveUser(userId);
    if (success) {
      ctx.reply(`✅ User ${userId} has been approved.`);
      try {
        await bot.telegram.sendMessage(userId, '✅ You have been approved! Welcome to the bot.');
      } catch {
        // User might not exist or have blocked the bot
      }
    } else {
      ctx.reply('❌ User not found.');
    }
  } catch (error) {
    ctx.reply('❌ Error approving user.');
    console.error('Error in approve command:', error);
  }
});

bot.command('deny', isAdmin, async (ctx) => {
  const args = ctx.message?.text?.split(' ') || [];
  const userId = parseInt(args[1]);

  if (isNaN(userId)) {
    return ctx.reply('Usage: /deny <user_id>');
  }

  try {
    const success = await userManager.denyUser(userId);
    if (success) {
      ctx.reply(`❌ User ${userId} has been denied.`);
      try {
        await bot.telegram.sendMessage(
          userId,
          '❌ Your access request has been denied.'
        );
      } catch {
        // User might not exist or have blocked the bot
      }
    } else {
      ctx.reply('❌ User not found.');
    }
  } catch (error) {
    ctx.reply('❌ Error denying user.');
    console.error('Error in deny command:', error);
  }
});

// ============ INITIALIZE AND START ============
async function initializeBot() {
  try {
    // Initialize database
    await databaseManager.initialize();
    console.log('✅ Database initialized');

    // Start bot polling
    bot.launch();
    console.log('✅ Bot started (polling)');

    // Start Express server
    app.listen(config.server.port, () => {
      console.log(`✅ Server running on port ${config.server.port}`);
    });

    // Health check endpoint
    app.get('/health', (req, res) => {
      res.json({ status: 'ok' });
    });

    // Graceful shutdown
    process.once('SIGINT', () => {
      bot.stop('SIGINT');
      databaseManager.close();
      process.exit(0);
    });

    process.once('SIGTERM', () => {
      bot.stop('SIGTERM');
      databaseManager.close();
      process.exit(0);
    });
  } catch (error) {
    console.error('❌ Failed to initialize bot:', error);
    process.exit(1);
  }
}

initializeBot();

export { bot, app };
