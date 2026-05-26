import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

export const config = {
  telegram: {
    token: process.env.TELEGRAM_TOKEN || '',
    username: process.env.BOT_USERNAME || '',
  },
  admin: {
    userId: parseInt(process.env.ADMIN_USER_ID || '0'),
  },
  server: {
    port: parseInt(process.env.PORT || '3000'),
    nodeEnv: process.env.NODE_ENV || 'development',
  },
  database: {
    path: process.env.DATABASE_PATH || './data/bot.db',
  },
  bot: {
    maxQuizQuestions: parseInt(process.env.MAX_QUIZ_QUESTIONS || '50'),
    quizTimeoutSeconds: parseInt(process.env.QUIZ_TIMEOUT_SECONDS || '300'),
  },
};

// Validation
if (!config.telegram.token) {
  throw new Error('TELEGRAM_TOKEN environment variable is required');
}

if (!config.admin.userId) {
  throw new Error('ADMIN_USER_ID environment variable is required');
}

export default config;
