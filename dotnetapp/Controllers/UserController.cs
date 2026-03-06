using Microsoft.AspNetCore.Mvc;
using dotnetapp.Models;
using dotnetapp.Services;

namespace dotnetapp.Controllers
{
    [ApiController]
    [Route("api")]
    public class UserController : ControllerBase
    {
        private readonly UserService _userService;
        private readonly IConfiguration _configuration;

        public UserController(UserService userService, IConfiguration configuration)
        {
            _userService = userService;
            _configuration = configuration;
        }

        /// <summary>Register a new user (Admin or Customer)</summary>
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] User user)
        {
            try
            {
                // If registering as Admin, validate the secret key
                // The admin secret key header must be passed: X-Admin-Key: ADMIN_SECRET_2024
                if (user.UserRole == UserRoles.Admin)
                {
                    var adminKey = Request.Headers["X-Admin-Key"].ToString();
                    var expectedKey = _configuration["AdminSecretKey"];
                    if (adminKey != expectedKey)
                    {
                        return StatusCode(403, new { message = "Invalid admin secret key." });
                    }
                }

                var existingUser = await _userService.GetUserByEmailAsync(user.Email);
                if (existingUser != null)
                    return Conflict(new { message = "User already exists." });

                var registeredUser = await _userService.RegisterUserAsync(user);
                return Ok(new { message = "User registered successfully.", userId = registeredUser.UserId });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        /// <summary>Authenticate user and return JWT token</summary>
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            try
            {
                if (model == null)
                    return BadRequest(new { message = "Invalid login request." });

                var user = await _userService.GetUserByEmailAsync(model.Email);
                if (user == null || user.Password != model.Password)
                    return Unauthorized(new { message = "Invalid email or password." });

                var token = await _userService.GenerateJwtTokenAsync(user);
                if (string.IsNullOrEmpty(token))
                    return StatusCode(500, new { message = "Error generating token." });

                return Ok(new
                {
                    Status = "Success",
                    token = token,
                    userId = user.UserId,
                    userRole = user.UserRole,
                    username = user.Username
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }
    }
}
