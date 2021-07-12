using BulkyBook.DataAccess.Data;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

[assembly: HostingStartup(typeof(BulkyBook.Areas.Identity.IdentityHostingStartup))]
namespace BulkyBook.Areas.Identity
{
    public class IdentityHostingStartup : IHostingStartup
    {
        public void Configure(IWebHostBuilder builder)
        {
            builder.ConfigureServices((context, services) => {
                services.AddDbContext<ApplicationDbContext>(options =>
                    options.UseSqlServer(
                        context.Configuration.GetConnectionString("ApplicationDbContextConnection")));

                // services.AddIdentity<ApplicationUser,IdentityRole>()
                   // .AddEntityFrameworkStores<ApplicationDbContext>()
                   // .AddDefaultTokenProviders();
            });
        }
    }
}