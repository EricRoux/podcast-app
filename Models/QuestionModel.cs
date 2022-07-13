using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using project1.Models.FromUser;

namespace project1.Models
{
    [Table("Questions", Schema = "Questions")]
    public class QuestionModel : UserQuestionModel
    {
        [Key]
        public int Id { get; set; }
        public virtual AccountModel Account { get; set; }
    }
}