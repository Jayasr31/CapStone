using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using dotnetapp.Models;
using dotnetapp.Services;
using dotnetapp.Exceptions;

namespace dotnetapp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class PartyHallController : ControllerBase
    {
        private readonly PartyHallService _partyHallService;

        public PartyHallController(PartyHallService partyHallService)
        {
            _partyHallService = partyHallService;
        }

        /// <summary>Get all party halls</summary>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PartyHall>>> Get()
        {
            try
            {
                var halls = await _partyHallService.GetAllPartyHallsAsync();
                return Ok(halls);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        /// <summary>Get a party hall by ID</summary>
        [HttpGet("{PartyHallId}")]
        public async Task<ActionResult<PartyHall>> Get(long PartyHallId)
        {
            try
            {
                var hall = await _partyHallService.GetPartyHallByIdAsync(PartyHallId);
                if (hall == null)
                    return NotFound(new { message = "Party hall not found." });
                return Ok(hall);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        /// <summary>Add a new party hall</summary>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] PartyHall partyHall)
        {
            try
            {
                if (partyHall == null)
                    return BadRequest(new { message = "Party hall data is null." });

                // Avoid navigation property conflicts
                partyHall.Bookings = null;

                var added = await _partyHallService.AddPartyHallAsync(partyHall);
                return CreatedAtAction(nameof(Get), new { PartyHallId = added.PartyHallId }, added);
            }
            catch (PartyHallException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        /// <summary>Update an existing party hall</summary>
        [HttpPut("{PartyHallId}")]
        public async Task<IActionResult> Put(long PartyHallId, [FromBody] PartyHall partyHall)
        {
            try
            {
                if (partyHall == null || PartyHallId != partyHall.PartyHallId)
                    return BadRequest(new { message = "Invalid party hall data or ID mismatch." });

                var updated = await _partyHallService.UpdatePartyHallAsync(PartyHallId, partyHall);
                if (updated == null)
                    return NotFound(new { message = "Party hall not found." });

                return Ok(updated);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        /// <summary>Delete a party hall by ID</summary>
        [HttpDelete("{PartyHallId}")]
        public async Task<IActionResult> Delete(long PartyHallId)
        {
            try
            {
                var deleted = await _partyHallService.DeletePartyHallAsync(PartyHallId);
                if (deleted == null)
                    return NotFound(new { message = "Party hall not found." });

                return Ok(deleted);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }
    }
}
