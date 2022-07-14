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

        public int AddQuestion(QuestionModel question)
        {
            // throw new System.NotImplementedException();
            appDBContent.Add<QuestionModel>(question);
            appDBContent.SaveChanges();
            return question.Id;
        }

        public QuestionModel Check(int questionId) => appDBContent.Question.Find(questionId);

        public IEnumerable<QuestionModel> GetAllQuestionByUserId(Guid UserId) => 
            appDBContent.Question.Where(q => q.Account.Id == UserId);

    }
}