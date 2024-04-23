import { Database } from 'sqlite3';
import { User } from '../../../middleware/types/user';
import { UserDAO } from '../dao/userDAO';

export class SqliteUserDAO implements UserDAO {
  private db: Database;

  constructor(db: Database) {
    this.db = db;
  }

  getUserByEmail(
    email: string,
    callback: (err: Error | null, rows: User[]) => Promise<void>
  ) {
    this.db.all('SELECT * FROM users WHERE email = ?', [email], callback);
  }

  insertUser(userId: string, email: string, password: string) {
    this.db.serialize(() => {
      this.db.run(
        'INSERT INTO users (userId, email, password) VALUES (?, ?, ?) ON CONFLICT DO NOTHING',
        [userId, email, password]
      );
    });
  }
}
