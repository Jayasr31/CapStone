using Microsoft.EntityFrameworkCore;
using dotnetapp.Data;
using dotnetapp.Models;

namespace dotnetapp.Services
{
    /// <summary>
    /// Service for review-related database operations
    /// </summary>
    public class ReviewService
    {
        private readonly ApplicationDbContext _context;

        public ReviewService(ApplicationDbContext context)
        {
            _context = context;
        }

        /// <summary>Retrieves all reviews with related User data</summary>
        public async Task<List<Review>> GetAllReviewsAsync()
        {
            return await _context.Reviews.Include(r => r.User).ToListAsync();
        }

        /// <summary>Adds a new review to the database</summary>
        public async Task<Review> AddReviewAsync(Review review)
        {
            _context.Reviews.Add(review);
            await _context.SaveChangesAsync();
            return review;
        }

        /// <summary>Retrieves all reviews for a specific user</summary>
        public async Task<IEnumerable<Review>> GetReviewsByUserIdAsync(long userId)
        {
            return await _context.Reviews
                .Include(r => r.User)
                .Where(r => r.UserId == userId)
                .ToListAsync();
        }
    }
}
