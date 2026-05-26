# Project Structure & File Guide

## File Organization

```
src/
├── bot.ts            # Main bot
├── config.ts         # Configuration
├── database.ts       # Database
├── types.ts          # TypeScript types
├── UserManager.ts    # User logic
├── QuizManager.ts    # Quiz logic
└── sampleData.ts     # Sample data
```

## Key Files

- **bot.ts** - All Telegram commands and handlers
- **UserManager.ts** - User registration & approval
- **QuizManager.ts** - Quiz storage & scoring
- **.env** - Your secrets (not in git)
- **package.json** - Dependencies

## Database

Automatic created at `./data/bot.db`

**Tables:**
- users
- quizzes  
- quiz_attempts

---

**Start with** `RUN_ON_RAILWAY.md` for deployment! 🚀
