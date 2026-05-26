import { databaseManager } from './database';
import { User } from './types';

export class UserManager {
  async addUser(user: User): Promise<User> {
    const result = await databaseManager.run(
      `INSERT INTO users (telegram_id, username, first_name, last_name, status)
       VALUES (?, ?, ?, ?, ?)`,
      [
        user.telegram_id,
        user.username || null,
        user.first_name || null,
        user.last_name || null,
        user.status || 'pending',
      ]
    );

    return this.getUserById(user.telegram_id) as Promise<User>;
  }

  async getUserById(telegramId: number): Promise<User | null> {
    const user = await databaseManager.get(
      'SELECT * FROM users WHERE telegram_id = ?',
      [telegramId]
    );
    return user || null;
  }

  async getPendingUsers(): Promise<User[]> {
    return databaseManager.all(
      'SELECT * FROM users WHERE status = ? ORDER BY requested_at ASC',
      ['pending']
    );
  }

  async getApprovedUsers(): Promise<User[]> {
    return databaseManager.all(
      'SELECT * FROM users WHERE status = ? ORDER BY approved_at DESC',
      ['approved']
    );
  }

  async approveUser(telegramId: number): Promise<boolean> {
    const result = await databaseManager.run(
      'UPDATE users SET status = ?, approved_at = CURRENT_TIMESTAMP WHERE telegram_id = ?',
      ['approved', telegramId]
    );
    return result.changes > 0;
  }

  async denyUser(telegramId: number): Promise<boolean> {
    const result = await databaseManager.run(
      'UPDATE users SET status = ? WHERE telegram_id = ?',
      ['denied', telegramId]
    );
    return result.changes > 0;
  }

  async isUserApproved(telegramId: number): Promise<boolean> {
    const user = await this.getUserById(telegramId);
    return user ? user.status === 'approved' : false;
  }

  async userExists(telegramId: number): Promise<boolean> {
    const user = await this.getUserById(telegramId);
    return user !== null;
  }
}

export const userManager = new UserManager();
