using project1.Models;
using project1.Data;
using project1.Data.Interfaces;
using project1.Data.Repositories;
using project1.Presentation.Interfaces;
using System.Threading.Tasks;

namespace project1.Domain.UseCases
{
    public class Question : IQuestionEntity
    {
        private AppDBContent appDBContent { get; }
        private IQuestion questionsRepository { get; }
        public Question(AppDBContent appDBContent) { 
            this.appDBContent = appDBContent;
            this.questionsRepository = new QuestionsRepository(appDBContent);
        }

        public int AddQiestion(QuestionModel q) => questionsRepository.addQuestion(q);
        public async Task<bool> Check(int questionId) {
            QuestionModel b = await appDBContent.Question.FindAsync(questionId);
            return b.Id == questionId;
        }
    }
}