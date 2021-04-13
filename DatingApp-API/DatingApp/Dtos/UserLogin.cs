using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DatingApp.Dtos
{
    public class UserLogin
    {
        [Required(ErrorMessage = "this field is required")]
        public string username { get; set; }

        [Required(ErrorMessage = "this field is required")]
        [StringLength(8, MinimumLength = 4, ErrorMessage = "this field should be between 4 and 8 charracters")]
        public string password { get; set; }
    }
}
