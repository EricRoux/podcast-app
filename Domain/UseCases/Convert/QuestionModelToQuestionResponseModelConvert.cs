using project1.Models;
using project1.Models.Responses;

namespace project1.Domain.UseCases.Convert
{
    public class QuestionModelToQuestionResponseModelConvert
    {
        private QuestionModel question { get; set; }
        private QuestionResponseModel questionResponse { get; set; }
        public QuestionModelToQuestionResponseModelConvert(QuestionModel question) {
            this.question = question;
        }

        public QuestionResponseModel Convert() =>
            new QuestionResponseModel() {
                Id = question.Id,
                Text = question.Text,
                Date = question.Date
            };

    }
}