using project1.Data.Interfaces;
using project1.Presentation.Interfaces;
using project1.Models;
using project1.Domain.UseCases.Convert;
using project1.Models.Requests;
using Microsoft.Extensions.Options;
using project1.Models.Responses;
using project1.Models.DbModels;

namespace project1.Domain.UseCases
{
    public class Authorization : IAuthEntity
    {

        private IAuthRepository authRepository { get; }
        private IOptions<AuthTokenModel> authOptions { get; set; }
        public Authorization(IAuthRepository authRepository, IOptions<AuthTokenModel> authOptions)
        {
            this.authRepository = authRepository;
            this.authOptions = authOptions;
        }

        public UserResponseModel CreateAccount(UserAuthModel account) {
            if(!IsExistEmail(account.Email))
                return ErrorLoginResponse("Email указан неправильно, либо уже занят");
            if(account.Password.Length <= 5)
                return ErrorLoginResponse("Пароль слишком маленький");
            DbAccountModel user = new UserAuthModelToAccountModelConvert(account).Convert();
            user = authRepository.CreateAccount(user);
            return Login(user);
        }

        private bool IsExistEmail(string email){
            if(!IsValidEmail(email)) return false;
            DbAccountModel status = authRepository.GetAccountByEmail(email);
            if(status != null) return false;
            return true;
        }

        private bool IsValidEmail(string email) {
            var trimmedEmail = email.Trim();
            if (trimmedEmail.EndsWith(".")) {
                return false; // suggested by @TK-421
            }
            try {
                var addr = new System.Net.Mail.MailAddress(email);
                return addr.Address == trimmedEmail;
            }
            catch {
                return false;
            }
        }

        public UserResponseModel Login(UserAuthModel account) {
            DbAccountModel dbUser = authRepository.GetAccountByEmail(account.Email);
            if (dbUser == null || account.Password != dbUser.Password)
                return ErrorLoginResponse("Неправильный Email или пароль");
            return CompleteLoginResponse(dbUser);
        }

        private UserResponseModel CompleteLoginResponse(DbAccountModel dbUser) =>
            new UserResponseModel() {
                Status = StatusCode.Complete,
                Message = "Авторизация успешно пройдена",
                Token = new GenerateToken(dbUser, authOptions).Create()
            };
        
        private UserResponseModel ErrorLoginResponse(string message) =>
            new UserResponseModel() {
                Status = StatusCode.Error,
                Message = message
            };

    }
}