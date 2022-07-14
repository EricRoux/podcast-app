using System;
using System.Collections.Generic;
using project1.Models;

namespace project1.Data.Interfaces
{
    public interface IQuestion
    {
        int AddQuestion(QuestionModel question);
        QuestionModel Check(int questionId);
        IEnumerable<QuestionModel> GetAllQuestionByUserId(Guid UserId);
    }
}