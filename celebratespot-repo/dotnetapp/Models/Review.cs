using System.ComponentModel.DataAnnotations;

namespace dotnetapp.Models
{
    public class Review
    {
        [Key]
        public int ReviewId { get; set; }
        public long UserId { get; set; }
        public string Subject { get; set; } = string.Empty;
        public string Body { get; set; } = string.Empty;
        public int Rating { get; set; }
        public DateTime DateCreated { get; set; }
        public User? User { get; set; }
    }
}
