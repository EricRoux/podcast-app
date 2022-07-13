using System;
using System.Threading.Tasks;
using project1.Models;

namespace project1.Data.Interfaces
{
    public interface IAuthRepository
    {
        Guid CreateAccount(AccountModel account);
        AccountModel GetAccountByEmail(string email);
    }
}