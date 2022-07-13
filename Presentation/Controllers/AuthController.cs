using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using project1.Models.Responses;
using project1.Presentation.Interfaces;
using project1.Models.Requests;

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
            LoginResponseModel result = authEntity.CreateAccount(request);
            if(result.Status != Models.Responses.StatusCode.Complete){
                return Conflict(result);
            }
            return Ok(result);
        }

        [Route("registration")]
        [HttpPost]
        public IActionResult Registration([FromBody]UserAuthModel request){
            LoginResponseModel result = authEntity.CreateAccount(request);
            if(result.Status != Models.Responses.StatusCode.Complete){
                return Conflict(result);
            }
            return Ok(result);
        }
    }
}