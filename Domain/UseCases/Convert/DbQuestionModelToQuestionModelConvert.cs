using System.Collections.Generic;
using project1.Models;

namespace project1.Domain.UseCases.Convert
{
    public class DbQuestionModelToQuestionModelConvert
    {
        private List<QuestionModel> questionsList { get; set; }
        private List<DbQuestionModel> dbQuestionsList { get; set; }
        public DbQuestionModelToQuestionModelConvert(List<DbQuestionModel> dbQuestionsList) {
            this.dbQuestionsList = dbQuestionsList;
        }

        public DbQuestionModelToQuestionModelConvert(DbQuestionModel dbQuestionsList) {
            this.dbQuestionsList = new List<DbQuestionModel>() {dbQuestionsList};
        }

        public List<QuestionModel> Convert() {
            questionsList = new List<QuestionModel>();
            for(int i=0; i<dbQuestionsList.Count; i++){
                questionsList.Add(
                    new QuestionModel() {
                        Id = this.dbQuestionsList[i].Id,
                        Email = this.dbQuestionsList[i].User.Email,
                        Text = this.dbQuestionsList[i].Text,
                        Date = this.dbQuestionsList[i].Date
                    }
                );
            }
            return questionsList;
        }
        
    }
}