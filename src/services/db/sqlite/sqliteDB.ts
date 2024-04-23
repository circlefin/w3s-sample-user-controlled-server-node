import { Database } from 'sqlite3';
import { registerUserDAO } from '../dao';
import { SqliteUserDAO } from './sqliteUserDAO';

const client = new Database(process.env.DATABASE_FILENAME ?? ':memory:');
const userDAO = new SqliteUserDAO(client);

export const createUserTable = (db: Database) => {
  db.exec(
    'CREATE TABLE IF NOT EXISTS users (userId TEXT PRIMARY KEY, email TEXT UNIQUE, password TEXT, createdAt TEXT DEFAULT CURRENT_TIMESTAMP)'
  );
};

export const initDB = () => {
  registerUserDAO(userDAO);
  createUserTable(client);
};

export const cleanupDB = () => {
  client.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Close the database connection.');
  });
};
