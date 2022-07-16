using System;
using System.Threading.Tasks;
using project1.Models;

namespace project1.Data.Interfaces
{
    public interface IAuthRepository
    {
        DbAccountModel CreateAccount(DbAccountModel account);
        DbAccountModel GetAccountByEmail(string email);
        DbAccountModel GetAccountByGuid(Guid id);
    }
}