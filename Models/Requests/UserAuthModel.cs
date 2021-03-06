using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace project1.Models.Requests
{
    public class UserAuthModel
    {        
        [Required]
        public string Email { get; set; }
        
        [Required]
        public string Password { get; set; }
    }
}