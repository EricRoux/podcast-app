using project1.Models;
using project1.Data.Interfaces;
using project1.Presentation.Interfaces;
using project1.Domain.UseCases.Convert;
using project1.Models.Requests;
using project1.Models.Responses;

namespace project1.Domain.UseCases
{
    public class Question : IQuestionEntity
    {
        private IQuestion questionsRepository { get; }
        private IAuthRepository authRepository { get; }
        public Question(IAuthRepository authRepository, IQuestion questionsRepository) {
            this.questionsRepository = questionsRepository;
            this.authRepository = authRepository;
        }

        public QuestionResponseModel AddQiestionToId(UserQuestionModel q) {
            QuestionModel question = new UserQuestionModelToQuestionModelConvert(q).Convert();
            question.Account = FindUser(q);
            int questionId = questionsRepository.addQuestion(question);
            if(IsQiestionCreated(questionId)){
                return new QuestionResponseModel() {
                    Status = StatusCode.Complete,
                    Message = "Вопос успешно добавлен"
                    
                };
            }
            return new QuestionResponseModel() {
                    Status = StatusCode.Error,
                    Message = "Произошла ошибка при записи вопроса"
                };
            
        }

        private AccountModel FindUser(UserQuestionModel question){
            return authRepository.GetAccountByGuid(question.UserId);
        }

        private bool IsQiestionCreated(int questionId) {
            QuestionModel chekcedQuestion = questionsRepository.Check(questionId);
            return chekcedQuestion.Id == questionId;
        }
    }
}