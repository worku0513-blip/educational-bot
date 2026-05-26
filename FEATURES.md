# 📚 Educational Bot - Complete Project Index

## 🎯 Project Overview
A Telegram-based quiz bot for private members with admin approval system.

## 🤖 Bot Commands Reference

### Public Commands (No Auth Required)
```
/start           - Register and request access
/help            - Show available commands
```

### User Commands (Approved Users Only)
```
/quizzes         - List all available quizzes
```

### Admin Commands (Admin ID Only)
```
/pending_users   - View users pending approval
/approve <id>    - Approve a user
/deny <id>       - Deny a user
/help            - Show admin-specific help
```

## 🔐 Authentication Flow

```
New User
    ↓
/start command
    ↓
User created with status='pending'
    ↓
Admin sees in /pending_users
    ↓
Admin uses /approve or /deny
    ↓
User status changes
    ↓
User can now access /quizzes
```

## 📦 Dependencies

### Main
- telegraf - Telegram Bot API
- express - Web server
- sqlite3 - Database
- dotenv - Environment variables
- typescript - TypeScript

### Dev
- ts-node - Run TypeScript
- jest - Testing
- ts-jest - Jest TypeScript support

## 🚀 Deployment Options

1. **Railway** (Free) - See `RUN_ON_RAILWAY.md`
2. **Docker** - Use included Dockerfile
3. **VPS** - Any Node.js hosting

---

**Ready to deploy?** See `RUN_ON_RAILWAY.md` 🚀
