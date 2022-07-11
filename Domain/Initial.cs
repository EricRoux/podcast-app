using System.IO;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using project1.Data;
using project1.Presentation.Interfaces;
using project1.Presentation;
using project1.Domain.Entities;
using Microsoft.Extensions.Options;
using project1.Models;

namespace project1.Domain {
    public class Initial {

        private IHostBuilder CreateHostBuilder(string[] args, IConfigurationBuilder configuration, Core core) =>
            new HostBuilder()
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder
                        .UseConfiguration(configuration.Build())
                        .ConfigureServices(services => services.AddSingleton<IQuestionEntity>(core.question))
                        .ConfigureServices(services => services.AddSingleton<IAuthEntity>(core.authorization))
                        .UseStartup<Startup>();
                    
                });
                
        public Initial(string[] args){
            string rootPath = Directory.GetCurrentDirectory();
            IConfigurationBuilder hostConf = new ConfigurationBuilder()
                .SetBasePath(rootPath)
                .AddJsonFile("appsettings.Development.json", false, true)
                .AddEnvironmentVariables();

            AuthTokenModel authOptionsConnfiguration = new AuthTokenModel();
            IOptions<AuthTokenModel> authOptions = Options.Create(authOptionsConnfiguration);

            AppDBContent dataBase = new AppDBContent();
            Core core = new Core(dataBase, authOptions);
            core.createUseCases();

            IHostBuilder hostBuilder = CreateHostBuilder(args, hostConf, core);
            IHost host = hostBuilder.Build();
            host.Run();
        }        
    }
}