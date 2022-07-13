using System;
using System.Threading.Tasks;
using project1.Models.FromUser;
namespace project1.Presentation.Interfaces
{
    public interface IAuthEntity
    {
        string CreateAccount(UserAuthModel account);
        string Login(UserAuthModel account);
    }
}