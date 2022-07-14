using System;
using System.Collections.Generic;
using project1.Models;
using project1.Models.Responses;

namespace project1.Domain.UseCases.Convert
{
    public class ListQuestionModelToGetQuestionResponseModelConvert
    {
        private IEnumerable<QuestionModel> questionList { get; set; }
        private List<QuestionResponseModel> questionResponseList { get; set; }
        public ListQuestionModelToGetQuestionResponseModelConvert(
            IEnumerable<QuestionModel> questionList
        ) {
            this.questionList = questionList;
        }

        public List<QuestionResponseModel> Convert() {
            List<QuestionResponseModel> q = new List<QuestionResponseModel>();
            foreach (QuestionModel question in questionList) {
                q.Add(
                    new QuestionModelToQuestionResponseModelConvert(question)
                        .Convert()
                );
            }
            return q;
        }
    }
}