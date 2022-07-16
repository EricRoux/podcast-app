using System;
using project1.Models;
using project1.Models.Requests;

namespace project1.Domain.UseCases.Convert
{
    public class UserQuestionModelToQuestionModelConvert
    {
        private UserQuestionModel userQuestion { get; set; }
        private QuestionModel question { get; set; }
        public UserQuestionModelToQuestionModelConvert(UserQuestionModel userQuestion)
        {
            this.userQuestion =  userQuestion;
        }

        public QuestionModel Convert() {
            this.question = new QuestionModel(){
                Text = userQuestion.Text,
                Date = userQuestion.Date
            };
            return this.question;
        }
    }
}