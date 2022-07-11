using System;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using project1.Data.Interfaces;
using project1.Models;
using project1.Presentation.Interfaces;

namespace project1.Presentation.Controllers
{
    [ApiController]
    [Route("/api/v1")]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public class ApiController : ControllerBase
    {
        private readonly IQuestionEntity  questions;
        public ApiController(IQuestionEntity questions)
        {
            this.questions = questions;
        }

        /// <summary>
        /// Add new question
        /// </summary>
        [HttpPost("newQuestion")]
        public IActionResult newQuestion([FromBody] QuestionModel q){
            int dbResponseId = questions.AddQiestionToId(q);
            bool checker = questions.Check(dbResponseId).Result;
            if(!checker){
                return BadRequest();
            }
            AddQuestionCompliteModel response = new AddQuestionCompliteModel{
                Id = dbResponseId,
                Text = "Комментарий успешно добавлен"
            };
            return Ok(response);
        }
    }
}