using System;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using project1.Data.Interfaces;
using project1.Models;

namespace project1.Presentation.Controllers
{
    [ApiController]
    [Route("/api/v1")]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public class ApiController : ControllerBase
    {
        private readonly IQuestion _questions;
        public ApiController(IQuestion questionInterface)
        {
            this._questions = questionInterface;
        }

        /// <summary>
        /// Add new question
        /// </summary>
        [HttpPost("newQuestion")]
        public IActionResult newQuestion([FromBody] Question q){
            _questions.addQuestion(q);
            return Ok();
        }
    }
}