using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using dotnetapp.Models;
using dotnetapp.Services;

namespace dotnetapp.Controllers
{
    [ApiController]
    [Route("api")]
    [Authorize]
    public class BookingController : ControllerBase
    {
        private readonly BookingService _bookingService;
        private readonly UserService _userService;

        public BookingController(BookingService bookingService, UserService userService)
        {
            _bookingService = bookingService;
            _userService = userService;
        }

        /// <summary>Get a booking by its ID</summary>
        [HttpGet("booking/{bookingId}")]
        public async Task<IActionResult> GetBooking(long bookingId)
        {
            try
            {
                var booking = await _bookingService.GetBookingByIdAsync(bookingId);
                if (booking == null)
                    return NotFound(new { message = "Booking not found." });
                return Ok(booking);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        /// <summary>Get all bookings for a specific user</summary>
        [HttpGet("user/{UserId}")]
        public async Task<IActionResult> GetBookingsByUserId(long UserId)
        {
            try
            {
                var bookings = await _bookingService.GetBookingsByUserIdAsync(UserId);
                return Ok(bookings);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        /// <summary>Get all bookings</summary>
        [HttpGet("booking")]
        public async Task<IActionResult> GetAllBookings()
        {
            try
            {
                var bookings = await _bookingService.GetAllBookingsAsync();
                return Ok(bookings);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        /// <summary>Add a new booking</summary>
        [HttpPost("booking")]
        public async Task<IActionResult> AddBooking([FromBody] Booking booking)
        {
            try
            {
                if (booking == null)
                    return BadRequest(new { message = "Booking data is null." });

                // Avoid navigation property conflicts
                booking.User = null;

                var addedBooking = await _bookingService.AddBookingAsync(booking);

                var user = await _userService.GetUserByIdAsync(booking.UserId ?? 0);
                if (user == null)
                    return BadRequest(new { message = "User not found." });

                return Ok(new { booking = addedBooking, user });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        /// <summary>Delete a booking by ID</summary>
        [HttpDelete("booking/{bookingId}")]
        public async Task<IActionResult> DeleteBooking(long bookingId)
        {
            try
            {
                await _bookingService.DeleteBookingAsync(bookingId);
                return Ok(new { message = "Booking deleted successfully." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        /// <summary>Update a booking's status</summary>
        [HttpPut("booking/{bookingId}")]
        public async Task<IActionResult> UpdateBooking(long bookingId, [FromBody] Booking updatedBooking)
        {
            try
            {
                if (bookingId != updatedBooking.BookingId)
                    return BadRequest(new { message = "Booking ID mismatch." });

                var existing = await _bookingService.GetBookingByIdAsync(bookingId);
                if (existing == null)
                    return NotFound(new { message = "Booking not found." });

                await _bookingService.UpdateBookingStatusAsync(bookingId, updatedBooking.Status);

                var updated = await _bookingService.GetBookingByIdAsync(bookingId);
                return Ok(updated);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }
    }
}
