namespace project1.Models.Responses
{
    public class LoginResponseModel
    {

        public StatusCode Status { get; set; }
        public string Message { get; set; }
        public string Token { get; set; }
    }
}