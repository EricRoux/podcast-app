using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using project1.Models.Requests;

namespace project1.Models
{
    [Table("Questions", Schema = "Questions")]
    public class DbQuestionModel: UserQuestionModel
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [ForeignKey("Guid")]
        public Guid UserGuid { get; set; }
        [Required]
        public virtual DbAccountModel User { get; set; }

    }
}