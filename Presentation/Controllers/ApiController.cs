using System;
using System.Linq;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using project1.Models.Requests;
using project1.Presentation.Interfaces;
using project1.Models.Responses;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using System.Collections.Generic;

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

        /// <summary>
        /// Add new question
        /// </summary>
        [HttpPost("newQuestion")]
        [Authorize]
        public IActionResult newQuestion([FromBody] UserQuestionModel q){
            CreateQuestionResponseModel result = questions.AddQiestion(q, UserId);
            if(result.Status != Models.Responses.StatusCode.Complete){
                return BadRequest(result);
            }
            return Ok(result);
        }

        /// <summary>
        /// Add new question
        /// </summary>
        [HttpGet("getQuestions")]
        [Authorize]
        public IActionResult getQuestions(){
            List<QuestionResponseModel> result = questions.GetQuestions(UserId);
            return Ok(result);
            // if(result.Status == Models.Responses.StatusCode.Error){
            //     return BadRequest(result);
            // }
        }
    }
}