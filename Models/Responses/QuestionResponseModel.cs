using System;
namespace project1.Models.Responses
{
    public class QuestionResponseModel
    {
        // public int QuestionId { get; set; }
        // public string QuestionText { get; set; }
        // public DateTime QuestionDate { get; set; }
        public StatusCode Status { get; set; }
        public string Message { get; set; }
    }
}