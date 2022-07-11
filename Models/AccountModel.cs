using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace project1.Models
{
    [Table("Users", Schema = "Accounts")]
    public class AccountModel
    {
        [Key]
        public Guid Id { get; set; }
        
        [Required]
        public string Email { get; set; }
        
        [Required]
        public string Password { get; set; }
        
        [Required]
        public Role Role { get; set; } = Role.User;
    }

    public enum Role {
        Admin,
        User
    }
}