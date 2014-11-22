using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Web_App.Controllers
{   [RoutePrefix ("contacts")]
    public class ContactsController : Controller
    {
       [Route ("")]
        public ActionResult Index()
        {
            return View("contacts");
        }
    }
}