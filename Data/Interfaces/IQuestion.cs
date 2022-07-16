using System;
using System.Collections.Generic;
using project1.Models.DbModels;
using project1.Models.Responses;

namespace project1.Data.Interfaces
{
    public interface IQuestion
    {
        DbQuestionModel AddQuestion(DbQuestionModel question);
        DbQuestionModel Check(int questionId);
        IEnumerable<QuestionModel> GetAllQuestionByUserGuid(Guid UserGuid);
    }
}