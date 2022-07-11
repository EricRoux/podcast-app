using project1.Models;

namespace project1.Domain.UseCases.Convert
{
    public class RegistrationModelToAccountModel
    {
        private RegistrationModel regAccount { get; set; }
        private AccountModel account { get; set; }
        public RegistrationModelToAccountModel(RegistrationModel regAccount)
        {
            this.regAccount =  regAccount;
        }

        public AccountModel Convert() {
            this.account = new AccountModel(){
                Id = regAccount.Id,
                Email = regAccount.Email,
                Password = regAccount.Password,
                Role = Role.User
            };
            return this.account;
        }
    }
}