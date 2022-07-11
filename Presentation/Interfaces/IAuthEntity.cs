using System.Threading.Tasks;
using project1.Models.FromUser;
namespace project1.Presentation.Interfaces
{
    public interface IAuthEntity
    {
        bool CheckPassword(UserAuthModel account);
        int CreateAccount(UserAuthModel account);
    }
}