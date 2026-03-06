using Microsoft.EntityFrameworkCore;
using dotnetapp.Data;
using dotnetapp.Models;
using dotnetapp.Exceptions;

namespace dotnetapp.Services
{
    /// <summary>
    /// Service for party hall related database operations
    /// </summary>
    public class PartyHallService
    {
        private readonly ApplicationDbContext _context;

        public PartyHallService(ApplicationDbContext context)
        {
            _context = context;
        }

        /// <summary>Retrieves all party halls from the database</summary>
        public async Task<IEnumerable<PartyHall>> GetAllPartyHallsAsync()
        {
            return await _context.PartyHalls.ToListAsync();
        }

        /// <summary>Adds a new party hall - throws if name already exists</summary>
        public async Task<PartyHall> AddPartyHallAsync(PartyHall partyHall)
        {
            // Check for duplicate hall name
            var existing = await _context.PartyHalls
                .FirstOrDefaultAsync(p => p.HallName == partyHall.HallName);

            if (existing != null)
                throw new PartyHallException("A party hall with the same name already exists");

            _context.PartyHalls.Add(partyHall);
            await _context.SaveChangesAsync();
            return partyHall;
        }

        /// <summary>Updates an existing party hall by ID</summary>
        public async Task<PartyHall?> UpdatePartyHallAsync(long id, PartyHall partyHall)
        {
            var existing = await _context.PartyHalls.FindAsync(id);
            if (existing == null) return null;

            existing.HallName = partyHall.HallName;
            existing.HallImageUrl = partyHall.HallImageUrl;
            existing.HallLocation = partyHall.HallLocation;
            existing.HallAvailableStatus = partyHall.HallAvailableStatus;
            existing.Price = partyHall.Price;
            existing.Capacity = partyHall.Capacity;
            existing.Description = partyHall.Description;
            existing.Theme = partyHall.Theme;
            existing.AdditionalImages = partyHall.AdditionalImages;

            await _context.SaveChangesAsync();
            return existing;
        }

        /// <summary>Deletes a party hall by ID</summary>
        public async Task<PartyHall?> DeletePartyHallAsync(long id)
        {
            var partyHall = await _context.PartyHalls.FindAsync(id);
            if (partyHall == null) return null;

            _context.PartyHalls.Remove(partyHall);
            await _context.SaveChangesAsync();
            return partyHall;
        }

        /// <summary>Retrieves a party hall by its ID</summary>
        public async Task<PartyHall?> GetPartyHallByIdAsync(long id)
        {
            return await _context.PartyHalls.FindAsync(id);
        }
    }
}
