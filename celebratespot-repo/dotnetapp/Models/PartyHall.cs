using System.ComponentModel.DataAnnotations;

namespace dotnetapp.Models
{
    public class PartyHall
    {
        [Key]
        public long PartyHallId { get; set; }
        public string HallName { get; set; } = string.Empty;
        public string HallImageUrl { get; set; } = string.Empty;
        public string HallLocation { get; set; } = string.Empty;
        public string HallAvailableStatus { get; set; } = string.Empty;
        public long Price { get; set; }
        public int Capacity { get; set; }
        public string Description { get; set; } = string.Empty;
        // Additional fields for enhanced UI
        public string Theme { get; set; } = string.Empty;
        public string AdditionalImages { get; set; } = string.Empty; // JSON array of image URLs
        public ICollection<Booking>? Bookings { get; set; }
    }
}
