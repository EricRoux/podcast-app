using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace project1.Models
{
    [Table("Users", Schema = "Accounts")]
    public class AccountModel : RegistrationModel
    {        
        [Required]
        public Role Role { get; set; } = Role.User;
    }

    public enum Role {
        User,
        Admin
    }
}