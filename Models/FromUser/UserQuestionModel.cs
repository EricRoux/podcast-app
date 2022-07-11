using System;
using System.ComponentModel.DataAnnotations;

namespace project1.Models.FromUser
{
    public class UserQuestionModel
    {
        [Required]
        public string Text { get; set; }

        [Required]
        public DateTime Date { get; set; }
    }
}