using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Web_App.Models;

namespace Web_App.Controllers
{
    [RoutePrefix("api/MyCrew")]
    public class MyCrewAPIController : ApiController
    {
        [Route("MyCrew"), HttpPost]
        public HttpResponseMessage Add([FromUri]MyCrewAddRequestModel model)
        {
            if (ModelState.IsValid)
            {

                return Request.CreateResponse(HttpStatusCode.OK, ModelState);


            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);

            }


        }
    }
}
