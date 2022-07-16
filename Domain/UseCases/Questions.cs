using System.Linq;
using System;
using project1.Data.Interfaces;
using project1.Presentation.Interfaces;
using project1.Domain.UseCases.Convert;
using project1.Models.Requests;
using project1.Models.Responses;
using System.Collections.Generic;
using project1.Models.DbModels;

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
        public QuestionsResponseModel AddQiestion(UserQuestionModel q, Guid UserGuid) {
            DbAccountModel user = FindUser(UserGuid);
            DbQuestionModel question = new UserQuestionModelToDbQuestionModelConvert(q, user).Convert();
            return  sendQuestionToDb(question);
        }

        private QuestionsResponseModel sendQuestionToDb(DbQuestionModel question){
            DbQuestionModel dbQuestion = questionsRepository.AddQuestion(question);
            if(IsQiestionCreated(dbQuestion)){
                return CreateCompliteQuestionResponse(dbQuestion);
            }
            return ErrorResponseQuestion();
        }

        private QuestionsResponseModel ErrorResponseQuestion() =>
            new QuestionsResponseModel() {
                    Status = StatusCode.Error,
                    Message = "Произошла ошибка при записи вопроса"
                };

        private QuestionsResponseModel CreateCompliteQuestionResponse(DbQuestionModel question) {
            List<QuestionModel> questionsList = new DbQuestionModelToQuestionModelConvert(question).Convert();
            return CompleteQuestionResponse(questionsList);
        }

        private QuestionsResponseModel CompleteQuestionResponse(List<QuestionModel> questionsList) =>
            new QuestionsResponseModel() {
                Status = StatusCode.Complete,
                Message = "Вопрос успешно добавлен",
                Questions = questionsList
            };
        
        public QuestionsResponseModel GetQuestions(Guid UserGuid) {
            List<QuestionModel> questionsList = questionsRepository.GetAllQuestionByUserGuid(UserGuid).ToList();
            return CompleteQuestionResponse(questionsList);
        }

        private DbAccountModel FindUser(Guid UserId){
            return authRepository.GetAccountByGuid(UserId);
        }

        private bool IsQiestionCreated(DbQuestionModel question) {
            DbQuestionModel chekcedQuestion = questionsRepository.Check(question.Id);
            return chekcedQuestion.Id == question.Id;
        }
    }
}