using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Web_App.Models
{
    public class NotificationViewModel
    {
        public List<User> Users { get; set; }

        public class User
        {

        public string Name { get; set; }
        public string Number { get; set; }
        }
    }
}