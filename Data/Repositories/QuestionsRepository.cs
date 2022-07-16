using System;
using System.Collections.Generic;
using System.Linq;
using project1.Data.Interfaces;
using project1.Models.DbModels;
using project1.Models.Responses;

namespace project1.Data.Repositories
{
    public class QuestionsRepository : IQuestion
    {
        private readonly AppDBContent appDBContent;
        public QuestionsRepository(AppDBContent appDBContent) {
            this.appDBContent = appDBContent;
        }

        public DbQuestionModel AddQuestion(DbQuestionModel question)
        {
            // throw new System.NotImplementedException();
            appDBContent.Add<DbQuestionModel>(question);
            appDBContent.SaveChanges();
            return question;
        }

        public DbQuestionModel Check(int questionId) => appDBContent.Question.Find(questionId);

        public IEnumerable<QuestionModel> GetAllQuestionsByUserGuid(Guid UserGuid, int firstId = 0) => 
            appDBContent.Question
                .Where(q => q.User.Guid == UserGuid)
                .Where(q => q.Id > firstId)
                .Join<DbQuestionModel, DbAccountModel, Guid, QuestionModel>(appDBContent.Account, 
                    q => q.UserGuid, 
                    u => u.Guid,
                    (q, u) => new QuestionModel() {
                        Id = q.Id,
                        Email = u.Email,
                        Text = q.Text,
                        Date = q.Date
                    }
                ).Take(100);
        public IEnumerable<QuestionModel> GetAllQuestions(int firstId = 0) => 
            appDBContent.Question
                .Where(q => q.Id > firstId)
                .Join<DbQuestionModel, DbAccountModel, Guid, QuestionModel>(appDBContent.Account, 
                    q => q.UserGuid, 
                    u => u.Guid,
                    (q, u) => new QuestionModel() {
                        Id = q.Id,
                        Email = u.Email,
                        Text = q.Text,
                        Date = q.Date
                    }
                ).Take(100);
    }
}