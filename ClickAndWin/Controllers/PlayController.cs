using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ClickAndWin.Models;
using Microsoft.AspNetCore.Mvc;

namespace ClickAndWin.Controllers
{
    public class PlayController : Controller
    {
        public IActionResult Index(AgModel agModel)
        {
            return View(agModel);
        }
    }
}