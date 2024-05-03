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
