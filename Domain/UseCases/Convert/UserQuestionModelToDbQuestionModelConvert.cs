using project1.Models;
using project1.Models.Requests;
using project1.Models.Responses;

namespace project1.Domain.UseCases.Convert
{
    public class UserQuestionModelToDbQuestionModelConvert
    {
        private UserQuestionModel question { get; set; }
        private DbQuestionModel questionResponse { get; set; }
        private DbAccountModel user { get; set; }
        public UserQuestionModelToDbQuestionModelConvert(UserQuestionModel question, DbAccountModel user) {
            this.question = question;
            this.user = user;
        }

        public DbQuestionModel Convert() =>
            new DbQuestionModel() {
                User = this.user,
                Text = this.question.Text,
                Date = this.question.Date
            };

    }
}