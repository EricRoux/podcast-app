using project1.Models;
using project1.Data;
using project1.Data.Interfaces;
using project1.Data.Repositories;
using project1.Presentation.Interfaces;

namespace project1.Domain.Entities
{
    public class Questions : IQuestions
    {
        private AppDBContent appDBContent { get; }
        private IQuestion questionsRepository { get; }
        public Questions(AppDBContent appDBContent) { 
            this.appDBContent = appDBContent;
            this.questionsRepository = new QuestionsRepository(appDBContent);

        }

        public AddQuestionCompliteModel AddQiestion(QuestionModel q) {
            int questionsId =  questionsRepository.addQuestion(q);
            AddQuestionCompliteModel response = new AddQuestionCompliteModel{
                Id = questionsId,
                Text = "Запись успешно создана"
            };
            return response;
        }
    }
}