using System.Threading.Tasks;
using project1.Models;

namespace project1.Data.Interfaces
{
    public interface IQuestion
    {
        int addQuestion(QuestionModel question);
        QuestionModel Check(int questionId);
    }
}