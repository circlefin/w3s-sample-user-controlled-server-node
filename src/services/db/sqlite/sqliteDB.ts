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
import { registerUserDAO } from '../dao';
import { SqliteUserDAO } from './sqliteUserDAO';
import { logger } from '../../logging/logger';

const client = new Database(process.env.DATABASE_FILENAME ?? ':memory:');
const userDAO = new SqliteUserDAO(client);

export const createUserTable = (db: Database) => {
  db.serialize(() => {
    db.exec(
      'CREATE TABLE IF NOT EXISTS users (userId TEXT PRIMARY KEY, email TEXT UNIQUE, password TEXT, createdAt TEXT DEFAULT CURRENT_TIMESTAMP)'
    );
  });
};

export const initDB = () => {
  registerUserDAO(userDAO);
  createUserTable(client);
  logger.info('Created users table');
};

export const cleanupDB = () => {
  client.close((err) => {
    if (err) {
      return logger.error(err.message);
    }
    logger.info('Database connection closed successfully');
  });
};
