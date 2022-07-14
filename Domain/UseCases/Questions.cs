using System;
using project1.Models;
using project1.Data.Interfaces;
using project1.Presentation.Interfaces;
using project1.Domain.UseCases.Convert;
using project1.Models.Requests;
using project1.Models.Responses;
using System.Collections.Generic;

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
        public CreateQuestionResponseModel AddQiestion(UserQuestionModel q, Guid UserId) {
            QuestionModel question = new UserQuestionModelToQuestionModelConvert(q).Convert();
            question.Account = FindUser(UserId);
            return  sendQuestionToDb(question);
        }

        private CreateQuestionResponseModel sendQuestionToDb(QuestionModel question){
            int questionId = questionsRepository.AddQuestion(question);
            if(IsQiestionCreated(questionId)){
                return ReturnCompleteCreateQuestion();
            }
            return ReturnErrorCreateQuestion();
        }

        private CreateQuestionResponseModel ReturnErrorCreateQuestion() =>
            new CreateQuestionResponseModel() {
                    Status = StatusCode.Error,
                    Message = "Произошла ошибка при записи вопроса"
                };

        private CreateQuestionResponseModel ReturnCompleteCreateQuestion() =>
            new CreateQuestionResponseModel() {
                    Status = StatusCode.Complete,
                    Message = "Вопос успешно добавлен"
                    
                };
        
        public List<QuestionResponseModel> GetQuestions(Guid UserId) => 
            new ListQuestionModelToGetQuestionResponseModelConvert(
                questionsRepository.GetAllQuestionByUserId(UserId)
            )
                .Convert();

        private AccountModel FindUser(Guid UserId){
            return authRepository.GetAccountByGuid(UserId);
        }

        private bool IsQiestionCreated(int questionId) {
            QuestionModel chekcedQuestion = questionsRepository.Check(questionId);
            return chekcedQuestion.Id == questionId;
        }
    }
}