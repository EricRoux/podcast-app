using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using project1.Data.Interfaces;
using project1.Models;

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

        public IEnumerable<QuestionModel> GetAllQuestionByUserGuid(Guid UserGuid) => 
            appDBContent.Question
                .Where(q => q.User.Guid == UserGuid)
                .Join<DbQuestionModel, DbAccountModel, Guid, QuestionModel>(appDBContent.Account, 
                    q => q.UserGuid, 
                    u => u.Guid,
                    (q, u) => new QuestionModel() {
                        Id = q.Id,
                        Email = u.Email,
                        Text = q.Text,
                        Date = q.Date
                    }
                );

    }
}