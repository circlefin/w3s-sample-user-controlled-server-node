import { app } from './app';
import { initDB, cleanupDB } from './services/db/sqlite/sqliteDB';
import {
  logger,
  registerLogger,
  SampleServerLogger
} from './services/logging/logger';

registerLogger(new SampleServerLogger());
initDB();

const port = process.env.PORT ?? 8080;
const server = app.listen(port, () => {
  logger.info(
    `Server is running at http://localhost:${port}/pw-user-controlled/foundational`
  );
});

process.on('SIGINT', function () {
  cleanupDB();
  server.close();
  logger.info('Server closed successfully');
});
