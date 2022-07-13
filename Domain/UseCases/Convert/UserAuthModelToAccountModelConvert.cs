using project1.Models;
using project1.Models.Requests;

namespace project1.Domain.UseCases.Convert
{
    public class UserAuthModelToAccountModelConvert
    {
        private UserAuthModel regAccount { get; set; }
        private AccountModel account { get; set; }
        public UserAuthModelToAccountModelConvert(UserAuthModel regAccount)
        {
            this.regAccount =  regAccount;
        }

        public AccountModel Convert() {
            this.account = new AccountModel(){
                Email = regAccount.Email,
                Password = regAccount.Password,
                Role = Role.User
            };
            return this.account;
        }
    }
}