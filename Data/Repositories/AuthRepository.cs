using System;
using project1.Data.Interfaces;
using project1.Models;
using System.Threading.Tasks;

namespace project1.Data.Repositories
{
    public class AuthRepository : IAuthRepository
    {
        private readonly AppDBContent appDBContent;
        public AuthRepository(AppDBContent appDBContent)
        {
            this.appDBContent = appDBContent;
        }


        public Guid CreateAccount(AccountModel account)
        {
            // throw new System.NotImplementedException();
            appDBContent.Add<AccountModel>(account);
            appDBContent.SaveChanges();
            return account.Id;
        }

        public async Task<string> GetPassword(AccountModel account) {
            AccountModel user = await FindAccount(account);
            return user.Password;
        }

        private async Task<AccountModel> FindAccount(AccountModel account) => await appDBContent.Account.FindAsync(account.Id);
    }
}