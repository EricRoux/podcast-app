using project1.Data.Interfaces;
using project1.Models;
using System.Threading.Tasks;
using System.Linq;

namespace project1.Data.Repositories
{
    public class AuthRepository : IAuthRepository
    {
        private readonly AppDBContent appDBContent;
        public AuthRepository(AppDBContent appDBContent)
        {
            this.appDBContent = appDBContent;
        }


        public int CreateAccount(AccountModel account)
        {
            // throw new System.NotImplementedException();
            appDBContent.Add<AccountModel>(account);
            appDBContent.SaveChanges();
            return account.Id;
        }

        public AccountModel GetAccountByEmail(string email) => 
            appDBContent.Account.Where(
                acc => acc.Email == email
            )
                .FirstOrDefault();
    }
}