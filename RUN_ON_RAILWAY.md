# 🚀 RUN YOUR BOT ON RAILWAY (FREE)

Your bot can run on Railway's free tier without installing Node.js on your computer!

## ✅ 3 Simple Steps

### Step 1: Railway recognizes this repo
Since this is now on GitHub, Railway will automatically detect it as a Node.js project.

### Step 2: Deploy on Railway
1. Go to https://railway.app
2. Sign in with GitHub
3. Click "New Project" → "Deploy from GitHub"
4. Select your `educational-bot` repo
5. Click "Deploy"

### Step 3: Add Your Secrets
In Railway dashboard:
1. Go to "Variables" tab
2. Add:
   - `TELEGRAM_TOKEN` = Your bot token
   - `BOT_USERNAME` = dynamicexambot
   - `ADMIN_USER_ID` = Your Telegram ID
   - `NODE_ENV` = production
3. Click "Redeploy"

## ✨ Done! Your Bot is Running 24/7

Open Telegram → Search `@dynamicexambot` → Send `/start` → It works! 🎉

## 📱 Test Your Bot

After deployment:
1. Open Telegram
2. Search your bot
3. Send `/start` - should work!
4. Send `/help` - see all commands

## 🎯 Admin Commands

```
/pending_users  - See user requests
/approve <id>   - Approve a user
/deny <id>      - Deny a user
/quizzes        - View quizzes
```

## Benefits

- ✅ No need to install Node.js
- ✅ Runs 24/7 automatically
- ✅ Free tier is plenty (500 hours/month)
- ✅ Auto-restarts if crashes
- ✅ Easy to update (just push to GitHub)

---

That's it! Your bot will be running in minutes. 🚀
