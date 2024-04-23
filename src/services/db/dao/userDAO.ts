import { User } from '../../../middleware';

export interface UserDAO {
  getUserByEmail: (
    email: string,
    callback: (err: Error | null, rows: User[]) => Promise<void>
  ) => void;
  insertUser: (userId: string, email: string, password: string) => void;
}

export let userDAO: UserDAO;

export const registerUserDAO = (newUserDAO: UserDAO) => {
  userDAO = newUserDAO;
};
