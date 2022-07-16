using System;
using project1.Models.Requests;
using project1.Models.Responses;

namespace project1.Presentation.Interfaces
{
    public interface IQuestionEntity
    {
        QuestionsResponseModel AddQiestion(UserQuestionModel q, Guid UserId);
        QuestionsResponseModel GetQuestions(Guid UserId);
    }
}