import { server } from './app';
import { initDB, cleanupDB } from './services/db/sqlite/sqliteDB';

initDB();

process.on('SIGINT', function () {
  cleanupDB();
  server.close();
  console.log('http server closed successfully.');
});
