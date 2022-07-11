using System.Threading.Tasks;
using project1.Models;
namespace project1.Presentation.Interfaces
{
    public interface IAuthEntity
    {
        Task<bool> CheckPassword(AccountModel account);
    }
}