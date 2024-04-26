import { Database } from 'sqlite3';
import { SqliteUserDAO } from '../sqliteUserDAO';
import { UserDAO } from '../../dao';
import { randomUUID } from 'crypto';
import { createUserTable } from '../sqliteDB';

describe('Sqlite User DAO', () => {
  let client: Database;
  let userDAO: UserDAO;

  beforeAll((done) => {
    client = new Database(':memory:');
    userDAO = new SqliteUserDAO(client);
    createUserTable(client);
    done();
  });

  afterAll(() => {
    client.close();
  });

  describe('Sqlite User DAO Integration Tests', () => {
    it('Should create a new user', (done) => {
      const userId = randomUUID();
      const email = `${userId}@email.com`;
      const password = 'password';
      userDAO.insertUser(userId, email, password);
      userDAO.getUserByEmail(email, async (err, rows) => {
        expect(rows.length).toEqual(1);
        expect(rows[0].userId).toEqual(userId);
        expect(rows[0].email).toEqual(email);
        done();
      });
    });

    it('Should do nothing if user id already exists', (done) => {
      const userId = randomUUID();
      const email = `${userId}@email.com`;
      const password = 'password';
      userDAO.insertUser(userId, email, password);
      userDAO.insertUser(userId, `${randomUUID()}@email.com`, password);
      userDAO.getUserByEmail(email, async (err, rows) => {
        expect(rows.length).toEqual(1);
        expect(rows[0].userId).toEqual(userId);
        expect(rows[0].email).toEqual(email);
        done();
      });
    });

    it('Should do nothing if user email already exists', (done) => {
      const userId = randomUUID();
      const email = `${userId}@email.com`;
      const password = 'password';
      userDAO.insertUser(userId, email, password);
      userDAO.insertUser(randomUUID(), email, password);
      userDAO.getUserByEmail(email, async (err, rows) => {
        expect(rows.length).toEqual(1);
        expect(rows[0].userId).toEqual(userId);
        expect(rows[0].email).toEqual(email);
        done();
      });
    });
  });
});
