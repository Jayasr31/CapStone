using Microsoft.EntityFrameworkCore;
using dotnetapp.Data;
using dotnetapp.Models;

namespace dotnetapp.Services
{

    public class BookingService
    {
        private readonly ApplicationDbContext _context;

        public BookingService(ApplicationDbContext context)
        {
            _context = context;
        }

  
        public async Task<Booking?> GetBookingByIdAsync(long id)
        {
            return await _context.Bookings.FindAsync(id);
        }


        public async Task<IEnumerable<Booking>> GetBookingsByUserIdAsync(long userId)
        {
            return await _context.Bookings
                .Include(b => b.PartyHall)
                .Include(b => b.User)
                .Where(b => b.UserId == userId)
                .ToListAsync();
        }


        public async Task<IEnumerable<Booking>> GetAllBookingsAsync()
        {
            return await _context.Bookings
                .Include(b => b.PartyHall)
                .Include(b => b.User)
                .ToListAsync();
        }


        public async Task<Booking> AddBookingAsync(Booking booking)
        {
            _context.Bookings.Add(booking);
            await _context.SaveChangesAsync();
            return booking;
        }


        public async Task DeleteBookingAsync(long id)
        {
            var booking = await _context.Bookings.FindAsync(id);
            if (booking != null)
            {
                _context.Bookings.Remove(booking);
                await _context.SaveChangesAsync();
            }
        }


        public async Task UpdateBookingStatusAsync(long id, string newStatus)
        {
            var booking = await _context.Bookings.FindAsync(id);
            if (booking == null)
                throw new Exception($"Booking with ID {id} not found.");

            booking.Status = newStatus;
            await _context.SaveChangesAsync();
        }
    }
}
