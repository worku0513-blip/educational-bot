# Educational Bot - Telegram Quiz Bot for Private Members

A Telegram-based educational quiz bot with admin approval system for private member access. Users can take quizzes, track scores, and admins can manage quiz content and approve new members.

## Features

✅ **Quiz Management**
- Create, list, and manage quizzes
- Multiple choice questions with instant feedback
- Score calculation and tracking

✅ **Member Access Control**
- Users request access via `/start`
- Admin approval workflow via `/pending_users`, `/approve`, `/deny`
- Private members-only access

✅ **Score Tracking**
- Track member progress and quiz attempts
- View personal results
- Quiz statistics

## Tech Stack

- **Platform**: Telegram Bot
- **Backend**: Node.js + Express + TypeScript
- **Bot Framework**: Telegraf
- **Database**: SQLite

## Quick Start

### Prerequisites
- Node.js 16+ and npm
- A Telegram Bot Token

### Installation
```bash
git clone https://github.com/worku0513-blip/educational-bot.git
cd educational-bot
npm install
```

### Configuration
Create a `.env` file:
```bash
cp .env.example .env
```

Edit `.env` with:
- `TELEGRAM_TOKEN` - Your bot token
- `BOT_USERNAME` - Your bot username
- `ADMIN_USER_ID` - Your Telegram ID

### Run
```bash
npm start
```

## Usage

### User Commands
- `/start` - Register and request access
- `/help` - Show available commands
- `/quizzes` - View all available quizzes (approved users)

### Admin Commands
- `/pending_users` - View pending access requests
- `/approve <user_id>` - Approve a user
- `/deny <user_id>` - Deny a user

## Deployment

See `RUN_ON_RAILWAY.md` for free cloud deployment.

## License

MIT License
