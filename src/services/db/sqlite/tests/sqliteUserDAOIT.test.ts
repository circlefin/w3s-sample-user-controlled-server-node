// Copyright (c) 2024, Circle Technologies, LLC. All rights reserved.
//
// SPDX-License-Identifier: Apache-2.0
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

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
