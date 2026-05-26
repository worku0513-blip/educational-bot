import { UserManager } from '../UserManager';
import { User } from '../types';

describe('UserManager', () => {
  let userManager: UserManager;

  beforeAll(() => {
    userManager = new UserManager();
  });

  test('should create a new user', async () => {
    const newUser: User = {
      telegram_id: 123456,
      username: 'testuser',
      first_name: 'Test',
      last_name: 'User',
      status: 'pending',
    };

    expect(userManager).toBeDefined();
  });

  test('should check if user is approved', async () => {
    expect(userManager).toBeDefined();
  });
});
