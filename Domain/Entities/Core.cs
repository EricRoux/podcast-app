using project1.Models;
using project1.Data;
using project1.Data.Interfaces;
using project1.Data.Repositories;
using project1.Domain.UseCases;

namespace project1.Domain.Entities
{
    public class Core
    {
        private AppDBContent appDBContent { get; }
        private IQuestion questionsRepository { get; }
        public Question Question { get; private set; }
        public Core(AppDBContent appDBContent) { 
            this.appDBContent = appDBContent;
            this.questionsRepository = new QuestionsRepository(appDBContent);
        }

        public void createUseCases(){
            Question = new Question(appDBContent);
        }
    }
}