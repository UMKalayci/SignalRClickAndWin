using ClickAndWin.Helper;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace ClickAndWin.Hubs
{
    public class ClickHub : Hub
    {
        private bool flag = true;
        private readonly Clickhecker _clickChecker;
        public ClickHub(Clickhecker _clickChecker)
        {
            this._clickChecker = _clickChecker;
        }
        public async Task GetButtonPossition(string group, int puan)
        {
            if (flag == false)
                return;
            flag = false;
            await Clients.Group(group).SendAsync("ReceiveUpdatePossition", "0");
            await Clients.GroupExcept(group, Context.ConnectionId).SendAsync("ReceiveUpdatePuan", puan);
            flag = true;
            Thread.Sleep(1000);
            string newLocation = _clickChecker.GetButtonNewPossition();
            await Clients.Group(group).SendAsync("ReceiveUpdatePossition", newLocation);
            //await Clients.Caller.SendAsync("Finished");
        }
        public async Task AddToGroup(string groupName)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);
        }

        public async Task RemoveFromGroup(string groupName)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);
        }

    }
}
