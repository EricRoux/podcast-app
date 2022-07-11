using project1.Models.FromUser;
using System.Threading.Tasks;

namespace project1.Presentation.Interfaces
{
    public interface IQuestionEntity
    {
        public int AddQiestionToId(UserQuestionModel q);
        public Task<bool> Check(int id);
    }
}