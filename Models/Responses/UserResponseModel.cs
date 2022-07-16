namespace project1.Models.Responses
{
    public class UserResponseModel
    {
        public StatusCode Status { get; set; }
        public string Token { get; set; }
        public string Message { get; set; }
    }
}