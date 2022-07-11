using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using project1.Models.FromUser;

namespace project1.Models
{
    [Table("Users", Schema = "Accounts")]
    public class AccountModel : UserAuthModel
    {        
        [Key]
        public int Id { get; set; }
        
        [Required]
        public Role Role { get; set; } = Role.User;
    }

    public enum Role {
        User,
        Admin
    }
}