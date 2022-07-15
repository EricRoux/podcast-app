using System.Security.Claims;
using System.Threading.Tasks;
using project1.Data;
using project1.Data.Interfaces;
using project1.Data.Repositories;
using project1.Presentation.Interfaces;
using project1.Models;
using System;
using project1.Domain.UseCases.Convert;
using project1.Models.Requests;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using project1.Models.Responses;

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

        public LoginResponseModel CreateAccount(UserAuthModel account) {
            if(!IsValidEmail(account.Email)) {
                return new LoginResponseModel() {
                    Status = StatusCode.Error,
                    Message = "Email указан неправильно"
                };
            }
            AccountModel user = new UserAuthModelToAccountModelConvert(account).Convert();
            AccountModel status = authRepository.GetAccountByEmail(user.Email);
            if (status != null) {
                // throw new Exception("Пользователь уже существует");
                return new LoginResponseModel() {
                    Status = StatusCode.Error,
                    Message = "Такой Email уже занят"
                };
            }
            authRepository.CreateAccount(user);
            return Login(user);
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

        private string GenerateJWT(AccountModel account)
        {
            AuthTokenModel authParam = authOptions.Value;
            SymmetricSecurityKey securityKey = authParam.GetSymmetricSecurityKey();
            SigningCredentials credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            List<Claim> claims = new List<Claim>(){
                new Claim(JwtRegisteredClaimNames.Email, account.Email),
                new Claim(JwtRegisteredClaimNames.Sub, account.Id.ToString()),
            };
            claims.Add(new Claim("role", account.Role.ToString()));
            JwtSecurityToken token = new JwtSecurityToken(
                authParam.Issuer,
                authParam.Audience,
                claims,
                expires: DateTime.Now.AddSeconds(authParam.TokenLifeTime),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public LoginResponseModel Login(UserAuthModel account)
        {
            AccountModel dbUser = authRepository.GetAccountByEmail(account.Email);
            if (dbUser == null || account.Password != dbUser.Password)
            {
                return ErrorLoginResponse();
            }
            return CompleteLoginResponse(dbUser);
        }

        private LoginResponseModel CompleteLoginResponse(AccountModel dbUser) =>
            new LoginResponseModel() {
                Status = StatusCode.Complete,
                Message = "Авторизация успешно пройдена",
                Token = GenerateJWT(dbUser)
            };
        
        private LoginResponseModel ErrorLoginResponse() =>
            new LoginResponseModel() {
                Status = StatusCode.Error,
                Message = "Неправильный Email или пароль",
                Token = ""
            };

    }
}