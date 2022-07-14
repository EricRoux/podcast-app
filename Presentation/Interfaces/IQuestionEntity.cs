using System;
using System.Collections.Generic;
using project1.Models.Requests;
using project1.Models.Responses;

namespace project1.Presentation.Interfaces
{
    public interface IQuestionEntity
    {
        CreateQuestionResponseModel AddQiestion(UserQuestionModel q, Guid UserId);
        List<QuestionResponseModel> GetQuestions(Guid UserId);
    }
}