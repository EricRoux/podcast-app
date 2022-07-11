using System;
using project1.Models;
using project1.Data;

namespace project1.Domain.UseCases
{
    public class IsQuestion
    {
        private readonly QuestionModel question;
        private readonly AppDBContent appDBContent;
        public IsQuestion(QuestionModel question, AppDBContent appDBContent) {
            this.question = question;
            this.appDBContent = appDBContent;
        }

        public async void Check(){
            var b = await appDBContent.Question.FindAsync(question.Id);
        }        
    }
}