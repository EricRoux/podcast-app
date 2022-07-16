using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using project1.Models.Requests;
using System.Collections.Generic;

namespace project1.Models
{
    [Table("Users", Schema = "Questions")]
    public class DbAccountModel : UserAuthModel
    {
        [Key]
        public Guid Guid { get; set; }

        [Required]
        public Role Role { get; set; } = Role.User;

    }

    public enum Role {
        User,
        Admin
    }
}