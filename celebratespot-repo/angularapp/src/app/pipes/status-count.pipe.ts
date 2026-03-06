import { Pipe, PipeTransform } from '@angular/core';
import { Booking } from '../models/booking.model';

@Pipe({ name: 'statusCount' })
export class StatusCountPipe implements PipeTransform {
  transform(bookings: Booking[], status: string): number {
    return bookings.filter(b => b.status?.toLowerCase() === status.toLowerCase()).length;
  }
}
