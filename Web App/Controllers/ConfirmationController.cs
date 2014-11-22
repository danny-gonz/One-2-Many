using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using Web_App.Models;

namespace Web_App.Controllers
{
    

    public class ConfirmationController : Controller
    {
        // GET: Confirmation
        
        public ActionResult Notification([FromUri]  NotificationViewModel model)
        {
            return View(model);
        }
    }
}