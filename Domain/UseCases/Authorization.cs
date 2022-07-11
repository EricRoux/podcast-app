using System.Threading.Tasks;
using project1.Data;
using project1.Data.Interfaces;
using project1.Data.Repositories;
using project1.Presentation.Interfaces;
using project1.Models;


namespace project1.Domain.UseCases
{
    public class Authorization : IAuthEntity
    {

        private IAuthRepository authRepository { get; }
        public Authorization(IAuthRepository authRepository)
        {
            this.authRepository = authRepository;   
        }

        public async Task<bool> CheckPassword(AccountModel account){
            string password = await authRepository.GetPassword(account);
            return password == account.Password;
        }

    }
}