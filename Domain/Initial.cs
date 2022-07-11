using System.IO;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using project1.Data;
using project1.Presentation.Interfaces;
using project1.Presentation;
using project1.Domain.Entities;

namespace project1.Domain {
    public class Initial {

        private IHostBuilder CreateHostBuilder(string[] args, IConfigurationBuilder configuration, Questions questions) =>
            new HostBuilder()
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder
                        .UseConfiguration(configuration.Build())
                        .ConfigureServices(services => services.AddSingleton<IQuestions>(questions))
                        .UseStartup<Startup>();
                    
                });
                
        public Initial(string[] args){
            string rootPath = Directory.GetCurrentDirectory();
            IConfigurationBuilder hostConf = new ConfigurationBuilder()
                .SetBasePath(rootPath)
                .AddJsonFile("appsettings.Development.json", false, true)
                .AddEnvironmentVariables();

            AppDBContent dataBase = new AppDBContent();
            Questions questions = new Questions(dataBase);

            IHostBuilder hostBuilder = CreateHostBuilder(args, hostConf, questions);
            IHost host = hostBuilder.Build();
            host.Run();
        }        
    }
}