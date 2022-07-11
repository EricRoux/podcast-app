using System.Threading.Tasks;
using project1.Data;
using project1.Data.Interfaces;
using project1.Data.Repositories;
using project1.Presentation.Interfaces;
using project1.Models;
using System;
using project1.Domain.UseCases.Convert;
using project1.Models.FromUser;

namespace project1.Domain.UseCases
{
    public class Authorization : IAuthEntity
    {

        private IAuthRepository authRepository { get; }
        public Authorization(IAuthRepository authRepository)
        {
            this.authRepository = authRepository;   
        }

        public bool CheckPassword(UserAuthModel account) => 
            account.Password == authRepository.GetAccountByEmail(account.Email).Password;

        
        public int CreateAccount(UserAuthModel account){
            AccountModel user = new UserAuthModelToAccountModelConvert(account).Convert();
            AccountModel status = authRepository.GetAccountByEmail(user.Email);
            if(status != null){
                return status.Id;
            }
            // throw new Exception("Пользователь уже существует");
            authRepository.CreateAccount(user);
            return -1;
        }

    }
}