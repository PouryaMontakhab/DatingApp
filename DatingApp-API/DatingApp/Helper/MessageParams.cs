using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatingApp.Helper
{
    public class MessageParams : PaginationParams
    {
        public int UserId { get; set; }
        public string MessageContainer { get; set; } = "Unread";
    }
}
