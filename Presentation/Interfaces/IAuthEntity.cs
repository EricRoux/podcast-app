using System.Threading.Tasks;
using project1.Models;
namespace project1.Presentation.Interfaces
{
    public interface IAuthEntity
    {
        bool CheckPassword(AccountModel account);
    }
}