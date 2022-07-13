using System;
using System.Linq;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using project1.Models.Requests;
using project1.Presentation.Interfaces;
using project1.Models.Responses;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace project1.Presentation.Controllers
{
    [ApiController]
    [Route("/api/v1")]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public class ApiController : ControllerBase
    {
        private readonly IQuestionEntity  questions;
        private Guid UserId => Guid.Parse(User.Claims.Single(c => c.Type == ClaimTypes.NameIdentifier).Value);
        public ApiController(IQuestionEntity questions)
        {
            this.questions = questions;
        }

        // /// <summary>
        // /// Add new question
        // /// </summary>
        // [HttpPost("newQuestion")]
        // public IActionResult newQuestion([FromBody] UserQuestionModel q){
        //     int dbResponseId = questions.AddQiestionToId(q);
        //     bool checker = questions.Check(dbResponseId).Result;
        //     if(!checker){
        //         return BadRequest();
        //     }
        //     AddQuestionCompliteModel response = new AddQuestionCompliteModel{
        //         Id = dbResponseId,
        //         Text = "Комментарий успешно добавлен"
        //     };
        //     return Ok(response);
        // }

        /// <summary>
        /// Add new question
        /// </summary>
        [HttpPost("newQuestion")]
        // [Authorize]
        public IActionResult newQuestionAuth([FromBody] UserQuestionModel q){
            QuestionResponseModel result = questions.AddQiestionToId(q);
            if(result.Status != Models.Responses.StatusCode.Complete){
                return BadRequest(result);
            }
            return Ok(result);
        }
    }
}