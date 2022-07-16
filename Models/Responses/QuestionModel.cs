using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using project1.Models.Requests;

namespace project1.Models.Responses
{
    public class QuestionModel : UserQuestionModel
    {
        public int Id { get; set; }
        public string Email { get; set; }
    }
}