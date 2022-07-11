using project1.Models;
using System.Threading.Tasks;

namespace project1.Presentation.Interfaces
{
    public interface IQuestionEntity
    {
         public int AddQiestion(QuestionModel q);
        public Task<bool> Check(int id);
    }
}