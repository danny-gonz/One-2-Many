using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(FindMeImDrunk.Startup))]
namespace FindMeImDrunk
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
