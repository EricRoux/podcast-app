using System.Drawing;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using project1.Models;
using project1.Presentation.Interfaces;


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
        public IActionResult Login([FromBody]AccountModel request){
            bool status = auth.CheckPassword(request).Result;
            if(!status){
                return Ok(new AuthResponseModel(){
                    Text = "Authorization Faild",
                });
            }
            return Ok(new AuthResponseModel(){
                Text = "Authorization Complite",
            });
        }
    }
}