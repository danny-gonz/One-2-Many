using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Web_App.Controllers
{
    //[RoutePrefix("splashpage")]

    public class HomePageController : Controller
    {
        [Route("homepage")]
        public ActionResult HomePage()
        {
            return View();
        }
    }
}