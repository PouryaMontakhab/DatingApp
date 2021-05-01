using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatingApp.Helper
{
    public class UserFilterParams : PaginationParams
    {
        
        public int UserId { get; set; }
        public string Gender { get; set; }

        public int MinAge { get; set; } = 18;
        public int MaxAge { get; set; } = 99;
        public string OrderBy { get; set; }
        public bool Liker { get; set; }
        public bool Likee { get; set; }

    }
}
