using System;
using System.Threading.Tasks;
using project1.Models;

namespace project1.Data.Interfaces
{
    public interface IAuthRepository
    {
        Task<string> GetPassword(AccountModel account);
        Guid CreateAccount(AccountModel account);
    }
}