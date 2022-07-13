using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using project1.Models.FromUser;
using System.Collections.Generic;

namespace project1.Models
{
    [Table("Users", Schema = "Questions")]
    public class AccountModel : UserAuthModel
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public Role Role { get; set; } = Role.User;

        public List<QuestionModel> questions { get; set; }

    }

    public enum Role {
        User,
        Admin
    }
}