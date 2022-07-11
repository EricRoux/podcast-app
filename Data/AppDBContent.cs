using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using project1.Models;
using System.IO;

namespace project1.Data
{
    public class AppDBContent : DbContext
    {
        public AppDBContent () {
            Database.Migrate();
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            string rootPath = Directory.GetCurrentDirectory();
            IConfigurationRoot Configuration = new ConfigurationBuilder()
                .SetBasePath(rootPath)
                .AddJsonFile("dbSettings.json", false, true)
                .AddEnvironmentVariables()
                .Build();
            optionsBuilder.UseNpgsql(Configuration.GetConnectionString("DefaultConnection"))
                .LogTo(System.Console.WriteLine)
                ;
        }

        // Указание свойств через переопределение метода OnModelCreating
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasDefaultSchema("Questions");
            modelBuilder.Entity<QuestionModel>();
        }
         public DbSet<QuestionModel> Question { get; set; }
         public DbSet<AccountModel> Account { get; set; }
    }
}