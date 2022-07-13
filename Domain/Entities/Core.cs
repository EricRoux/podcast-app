using project1.Models;
using project1.Data;
using project1.Data.Interfaces;
using project1.Data.Repositories;
using project1.Domain.UseCases;
using Microsoft.Extensions.Options;

namespace project1.Domain.Entities
{
    public class Core
    {
        private AppDBContent appDBContent { get; }
        private IQuestion questionsRepository { get; }
        private IAuthRepository authRepository { get; }
        public Question question { get; private set; }
        public Authorization authorization { get; private set; }
        private IOptions<AuthTokenModel> authOptions { get; }
        public Core(AppDBContent appDBContent, IOptions<AuthTokenModel> authOptions) { 
            this.appDBContent = appDBContent;
            this.questionsRepository = new QuestionsRepository(appDBContent);
            this.authRepository = new AuthRepository(appDBContent);
            this.authOptions = authOptions;
        }

        public void createUseCases(){
            question = new Question(authRepository, questionsRepository);
            authorization = new Authorization(authRepository, authOptions);
        }
    }
}