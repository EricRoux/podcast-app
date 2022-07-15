using System;
namespace project1.Models.Responses
{
    public class CreateQuestionResponseModel
    {
        public int? Id { get; set; }
        // public string QuestionText { get; set; }
        public DateTime? Date { get; set; }
        public StatusCode Status { get; set; }
        // public QuestionResponseModel Question { get; set; }
        // public Guid Id { get; set; }
        public string Message { get; set; }
    }
}