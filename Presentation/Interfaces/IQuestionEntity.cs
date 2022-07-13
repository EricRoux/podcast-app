using project1.Models.Requests;
using project1.Models.Responses;

namespace project1.Presentation.Interfaces
{
    public interface IQuestionEntity
    {
        QuestionResponseModel AddQiestionToId(UserQuestionModel q);
    }
}