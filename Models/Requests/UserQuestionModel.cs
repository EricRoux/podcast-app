using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;

namespace project1.Models.Requests
{
    public class UserQuestionModel
    {
        [Required]
        public string Text { get; set; }

        [Required]
        public DateTime Date { get; set; }
    }
}