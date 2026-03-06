import { User } from './user.model';

export interface Review {
  reviewId?: number;
  userId: number;
  subject: string;
  body: string;
  rating: number;
  dateCreated: string;
  user?: User;
}
