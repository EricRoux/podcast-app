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

        private IAuthEntity auth { get; set; }
        public AuthController(IAuthEntity auth) {
            this.auth = auth;
        }

        [Route("login")]
        [HttpPost]
        public IActionResult Login([FromBody]UserAuthModel request){
            bool status = auth.CheckPassword(request);
            if(!status){
                return Ok(new AuthResponseModel(){
                    Text = "Authorization Faild",
                });
            }
            return Ok(new AuthResponseModel(){
                Text = "Authorization Complite",
            });
        }

        [Route("registration")]
        [HttpPost]
        public IActionResult Registration([FromBody]UserAuthModel request){
            int status = auth.CreateAccount(request);
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