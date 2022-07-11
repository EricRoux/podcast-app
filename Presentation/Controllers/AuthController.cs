using System;
using System.Drawing;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using project1.Models.ForUser;
using project1.Presentation.Interfaces;
using project1.Models.FromUser;

namespace project1.Presentation.Controllers
{
    [ApiController]
    [Route("/api/v1/[controller]")]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public class AuthController: ControllerBase {

        private IAuthEntity authEntity { get; set; }
        public AuthController(IAuthEntity authEntity) {
            this.authEntity = authEntity;            
        }

        [Route("login")]
        [HttpPost]
        public IActionResult Login([FromBody]UserAuthModel request){
            string token = authEntity.Login(request);
            if(token == ""){
                return Ok(new AuthResponseModel(){
                    Token = "",
                    Text = "Authorization Faild",
                });
            }
            return Ok(new AuthResponseModel(){
                Token = token,
                Text = "Authorization Complite",
            });
        }

        [Route("registration")]
        [HttpPost]
        public IActionResult Registration([FromBody]UserAuthModel request){
            int status = authEntity.CreateAccount(request);
            if(status >= 0){
                return Ok(new AuthResponseModel(){
                    Text = "Registration Faild. User already exists.",
                });
            }
            return Ok(new AuthResponseModel(){
                Text = "Registration Complite",
            });
        }
    }
}