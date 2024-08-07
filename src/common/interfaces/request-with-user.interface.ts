import { Request } from 'express';
import { User } from './user.interfaces';

export interface RequestWithUser extends Request {
  user: User;
}
