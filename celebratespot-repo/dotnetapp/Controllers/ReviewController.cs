using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using dotnetapp.Models;
using dotnetapp.Services;

namespace dotnetapp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class ReviewController : ControllerBase
    {
        private readonly ReviewService _reviewService;
        private readonly UserService _userService;

        public ReviewController(ReviewService reviewService, UserService userService)
        {
            _reviewService = reviewService;
            _userService = userService;
        }

        /// <summary>Get all reviews (Admin access)</summary>
        [HttpGet]
        public async Task<IActionResult> GetAllReviews()
        {
            try
            {
                var reviews = await _reviewService.GetAllReviewsAsync();
                return Ok(reviews);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        /// <summary>Get reviews by user ID</summary>
        [HttpGet("{userId}")]
        public async Task<IActionResult> GetReviewsByUserId(long userId)
        {
            try
            {
                var reviews = await _reviewService.GetReviewsByUserIdAsync(userId);
                return Ok(reviews);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        /// <summary>Add a new review (Customer access)</summary>
        [HttpPost]
        public async Task<IActionResult> AddReview([FromBody] Review review)
        {
            try
            {
                if (review == null)
                    return BadRequest(new { message = "Review data is null." });

                // If user object provided but userId doesn't match, ignore user object
                if (review.User != null && review.User.UserId != review.UserId)
                    review.User = null;

                var addedReview = await _reviewService.AddReviewAsync(review);

                var user = await _userService.GetUserByIdAsync(review.UserId);
                if (user == null)
                    return BadRequest(new { message = "User not found." });

                return Ok(new { review = addedReview, user });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }
    }
}
