using System.Security.Claims;
using System.Threading.Tasks;
using project1.Data;
using project1.Data.Interfaces;
using project1.Data.Repositories;
using project1.Presentation.Interfaces;
using project1.Models;
using System;
using project1.Domain.UseCases.Convert;
using project1.Models.FromUser;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;

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

        public int CreateAccount(UserAuthModel account)
        {
            AccountModel user = new UserAuthModelToAccountModelConvert(account).Convert();
            AccountModel status = authRepository.GetAccountByEmail(user.Email);
            if (status != null)
            {
                return status.Id;
            }
            // throw new Exception("Пользователь уже существует");
            authRepository.CreateAccount(user);
            return -1;
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

        public string Login(UserAuthModel account)
        {
            AccountModel dbUser = authRepository.GetAccountByEmail(account.Email);
            if (account.Password != dbUser.Password)
            {
                return "";
            }
            return GenerateJWT(dbUser);
        }

    }
}