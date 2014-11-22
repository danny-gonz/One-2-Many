using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Web_App.Controllers
{
    //[RoutePrefix("Confirm")]

    public class ConfirmationController : Controller
    {
        // GET: Confirmation
        //[Route("Notice"), HttpGet]
        public ActionResult Notification()
        {
            return View();
        }
    }
}