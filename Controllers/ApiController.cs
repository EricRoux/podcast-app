using System;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace project1
{
    [ApiController]
    [Route("/api/v1")]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public class ApiController : ControllerBase
    {
        /// <summary>
        /// Add new question
        /// </summary>
        [HttpPost("newQuestion")]
        public IActionResult newQuestion([FromBody] Question q){
            return Ok();
        }
    }
}