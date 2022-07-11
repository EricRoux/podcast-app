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
        private IQuestion questionsRepository { get; }
        public Question(IQuestion questionsRepository) {
            this.questionsRepository = questionsRepository;
        }

        public int AddQiestionToId(QuestionModel q) => questionsRepository.addQuestion(q);
        public async Task<bool> Check(int questionId) {
            QuestionModel chekcedQuestion = await questionsRepository.Check(questionId);
            return chekcedQuestion.Id == questionId;
        }
    }
}