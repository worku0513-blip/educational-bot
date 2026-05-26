# Quick Start Guide - Educational Bot

## 🚀 Get Running in 5 Minutes

### Step 1: Get Bot Token (1 min)
Open Telegram → Search [@BotFather](https://t.me/botfather) → `/newbot` → Follow prompts → Copy token

### Step 2: Get Admin ID (1 min)
Open Telegram → Search [@userinfobot](https://t.me/userinfobot) → `/start` → Copy your ID

### Step 3: Deploy to Railway (3 min)
See `RUN_ON_RAILWAY.md` for free cloud deployment.

## 📱 Try These Commands

| Command | What it does | Who can use |
|---------|-------------|--------|
| `/start` | Register & request access | Anyone |
| `/help` | Show available commands | Anyone |
| `/quizzes` | View available quizzes | Approved users only |
| `/pending_users` | See access requests | Admin only |
| `/approve 123456` | Approve a user by ID | Admin only |
| `/deny 123456` | Deny access to a user | Admin only |

## 🎯 Typical Workflow

1. **User sends `/start`**
   - Bot: "Your request is pending admin approval"

2. **Admin sends `/pending_users`**
   - Bot shows list of pending users

3. **Admin sends `/approve 123456`**
   - Bot: "User approved"
   - User gets: "You've been approved!"

4. **Approved user sends `/quizzes`**
   - Bot shows all available quizzes

---

**Ready?** → Deploy on Railway (see `RUN_ON_RAILWAY.md`) 🚀
