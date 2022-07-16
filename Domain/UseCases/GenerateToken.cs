using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using project1.Models;
using project1.Models.DbModels;

namespace project1.Domain.UseCases
{
    public class GenerateToken
    {
        private DbAccountModel account { get; set; }
        private IOptions<AuthTokenModel> authOptions { get; set; }
        public GenerateToken(DbAccountModel account, IOptions<AuthTokenModel> authOptions) {
            this.account = account;
            this.authOptions = authOptions;
        }

        public string Create()
        {
            AuthTokenModel authParam = this.authOptions.Value;
            SymmetricSecurityKey securityKey = authParam.GetSymmetricSecurityKey();
            SigningCredentials credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            List<Claim> claims = new List<Claim>(){
                new Claim(JwtRegisteredClaimNames.Email, this.account.Email),
                new Claim(JwtRegisteredClaimNames.Sub, this.account.Guid.ToString()),
            };
            claims.Add(new Claim("role", this.account.Role.ToString()));
            JwtSecurityToken token = new JwtSecurityToken(
                authParam.Issuer,
                authParam.Audience,
                claims,
                expires: DateTime.Now.AddSeconds(authParam.TokenLifeTime),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}