using System;
using project1.Models;
using project1.Models.Requests;

namespace project1.Domain.UseCases.Convert
{
    public class UserAuthModelToAccountModelConvert
    {
        private UserAuthModel userAuth { get; set; }
        private DbAccountModel account { get; set; }
        public UserAuthModelToAccountModelConvert(UserAuthModel userAuth)
        {
            this.userAuth =  userAuth;
        }

        public DbAccountModel Convert() {
            this.account = new DbAccountModel(){
                Email = userAuth.Email,
                Password = userAuth.Password,
                Guid = Guid.NewGuid(),
                Role = Role.User
            };
            return this.account;
        }
    }
}