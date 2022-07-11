using System.Threading.Tasks;
using project1.Data;
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

        public int addQuestion(QuestionModel question)
        {
            // throw new System.NotImplementedException();
            appDBContent.Add<QuestionModel>(question);
            appDBContent.SaveChanges();
            return question.Id;
        }
    }
}