using System.Collections.Generic;

namespace project1.Models.Responses
{
    public class QuestionsResponseModel
    {
        public StatusCode Status { get; set; }
        public List<QuestionModel> Questions { get; set; }
        public string Message { get; set; }

    }
}