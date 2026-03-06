using Microsoft.EntityFrameworkCore;
using dotnetapp.Data;
using dotnetapp.Models;

namespace dotnetapp.Services
{
    /// <summary>
    /// Service for booking-related database operations
    /// </summary>
    public class BookingService
    {
        private readonly ApplicationDbContext _context;

        public BookingService(ApplicationDbContext context)
        {
            _context = context;
        }

        /// <summary>Retrieves a booking by its ID</summary>
        public async Task<Booking?> GetBookingByIdAsync(long id)
        {
            return await _context.Bookings.FindAsync(id);
        }

        /// <summary>Retrieves all bookings for a specific user with related data</summary>
        public async Task<IEnumerable<Booking>> GetBookingsByUserIdAsync(long userId)
        {
            return await _context.Bookings
                .Include(b => b.PartyHall)
                .Include(b => b.User)
                .Where(b => b.UserId == userId)
                .ToListAsync();
        }

        /// <summary>Retrieves all bookings with related party hall and user data</summary>
        public async Task<IEnumerable<Booking>> GetAllBookingsAsync()
        {
            return await _context.Bookings
                .Include(b => b.PartyHall)
                .Include(b => b.User)
                .ToListAsync();
        }

        /// <summary>Adds a new booking to the database</summary>
        public async Task<Booking> AddBookingAsync(Booking booking)
        {
            _context.Bookings.Add(booking);
            await _context.SaveChangesAsync();
            return booking;
        }

        /// <summary>Deletes a booking by its ID</summary>
        public async Task DeleteBookingAsync(long id)
        {
            var booking = await _context.Bookings.FindAsync(id);
            if (booking != null)
            {
                _context.Bookings.Remove(booking);
                await _context.SaveChangesAsync();
            }
        }

        /// <summary>Updates the status of an existing booking</summary>
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
