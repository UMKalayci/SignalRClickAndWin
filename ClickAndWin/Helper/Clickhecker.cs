using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ClickAndWin.Helper
{
    public class Clickhecker
    {
        internal string GetButtonNewPossition()
        {
            int x = new Random().Next(1, 6);
            int y = new Random().Next(0, 10);

            return x + "" + y;
        }
    }
}
