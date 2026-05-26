# Deploy to Railway (FREE) - 5 Minutes

Railway is a free cloud platform that runs Node.js apps. Perfect for your bot!

## 🚀 Quick Deployment Steps

### Step 1: Code is on GitHub
Your code is now on GitHub at: https://github.com/worku0513-blip/educational-bot

### Step 2: Deploy on Railway
1. Go to https://railway.app
2. Click "New Project"
3. Select "Deploy from GitHub"
4. Choose your `educational-bot` repository
5. Railway automatically detects Node.js app
6. Click "Deploy"

### Step 3: Add Environment Variables
In Railway dashboard:
1. Go to your project
2. Click "Variables"
3. Add these variables:
   - `TELEGRAM_TOKEN` = Your bot token
   - `BOT_USERNAME` = dynamicexambot
   - `ADMIN_USER_ID` = Your Telegram ID
   - `NODE_ENV` = production
   - `PORT` = 3000

4. Click "Redeploy"

### Step 4: Done! ✅
- Railway will auto-deploy
- Your bot runs 24/7
- Free tier includes 500 hours/month

## 📊 What Railway Provides
- ✅ Always running (24/7)
- ✅ Automatic restarts if it crashes
- ✅ Free SSL certificate
- ✅ Environment variables management
- ✅ Logs and monitoring

## 🔗 Access Your Bot
After deployment:
1. Open Telegram
2. Search: `@dynamicexambot`
3. Send `/start`
4. Bot responds! 🎉

## 📈 Monitor Your Bot
In Railway dashboard:
- View logs: See what your bot is doing
- View metrics: CPU, memory usage
- Restart: If needed

## 🆘 Troubleshooting

**Bot not responding?**
- Check logs in Railway dashboard
- Verify TELEGRAM_TOKEN is correct
- Verify ADMIN_USER_ID is set

**Deployment failed?**
- Check Railway logs for errors
- Make sure files are included
- Verify .env variables are set

## 💡 Pro Tips
- Railway updates automatically when you push to GitHub
- Logs show real-time bot activity
- You can pause deployment to save hours

---

Your bot will be live in 5 minutes! 🚀
