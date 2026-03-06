using Microsoft.EntityFrameworkCore;
using dotnetapp.Data;
using dotnetapp.Models;

namespace dotnetapp.Services
{

    public class ReviewService
    {
        private readonly ApplicationDbContext _context;

        public ReviewService(ApplicationDbContext context)
        {
            _context = context;
        }


        public async Task<List<Review>> GetAllReviewsAsync()
        {
            return await _context.Reviews.Include(r => r.User).ToListAsync();
        }


        public async Task<Review> AddReviewAsync(Review review)
        {
            _context.Reviews.Add(review);
            await _context.SaveChangesAsync();
            return review;
        }


        public async Task<IEnumerable<Review>> GetReviewsByUserIdAsync(long userId)
        {
            return await _context.Reviews
                .Include(r => r.User)
                .Where(r => r.UserId == userId)
                .ToListAsync();
        }
    }
}
