using Microsoft.EntityFrameworkCore;
using project1.Models;

namespace project1.Data
{
    public class AppDBContent : DbContext
    {
        public AppDBContent (DbContextOptions<AppDBContent> options) : base(options)
        {

        }

        public DbSet<Question> Question { get; set; }
    }
}