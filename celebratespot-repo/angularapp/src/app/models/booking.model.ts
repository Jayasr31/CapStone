import { PartyHall } from './partyhall.model';
import { User } from './user.model';

export interface Booking {
  bookingId?: number;
  noOfPersons: number;
  fromDate: string;
  toDate: string;
  status: string;
  totalPrice: number;
  address: string;
  userId?: number;
  user?: User;
  partyHallId?: number;
  partyHall?: PartyHall;
}
