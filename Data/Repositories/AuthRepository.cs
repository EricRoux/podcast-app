using project1.Data.Interfaces;
using System.Threading.Tasks;
using System.Linq;
using System;
using project1.Models.DbModels;

namespace project1.Data.Repositories
{
    public class AuthRepository : IAuthRepository
    {
        private readonly AppDBContent appDBContent;
        public AuthRepository(AppDBContent appDBContent)
        {
            this.appDBContent = appDBContent;
        }


        public DbAccountModel CreateAccount(DbAccountModel account)
        {
            // throw new System.NotImplementedException();
            appDBContent.Add<DbAccountModel>(account);
            appDBContent.SaveChanges();
            return account;
        }

        public DbAccountModel GetAccountByEmail(string email) => 
            appDBContent.Account.Where(
                acc => acc.Email == email
            )
                .FirstOrDefault();
        
        public DbAccountModel GetAccountByGuid(Guid guid) =>
            appDBContent.Account.Where(
                acc => acc.Guid == guid
            )
                .FirstOrDefault();
    }
}