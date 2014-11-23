using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Web_App.Controllers
{
    [RoutePrefix("MyCrew")]
    public class MyCrewController : Controller
    {
        // GET: MyCrew                
        public ActionResult Crew()
            {


                return View();

            }
        }
    }
