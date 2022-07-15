using System;
using System.Collections.Generic;

namespace project1.Models.Responses
{
    public class GetQuestionResponseListModel
    {
        public List<QuestionResponseModel> List { get; set; }
        public string Email { get; set; }
        public StatusCode Status { get; set; }
        // public Guid UserId { get; set; }
        // public string Message { get; set; }
    }
}