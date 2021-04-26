using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DatingApp.Dtos
{
    public class UserRegisteration
    {

        public UserRegisteration()
        {
            this.Created = DateTime.Now;
            this.LastActive = DateTime.Now;
        }
        [Required(ErrorMessage ="{0} is required")]
        public string username { get; set; }

        [Required(ErrorMessage = "{0} is required")]
        [StringLength(8, MinimumLength = 4, ErrorMessage = "this field should be between 4 and 8 charracters")]
        public string password { get; set; }

        [Required(ErrorMessage = "{0} is required")]
        public string Gender { get; set; }

        [Required(ErrorMessage = "{0} is required")]
        public string KnownAs { get; set; }

        [Required(ErrorMessage = "{0} is required")]
        public DateTime DateOfBirth { get; set; }

        [Required(ErrorMessage = "{0} is required")]
        public string City { get; set; }

        [Required(ErrorMessage = "{0} is required")]
        public string Country { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; }
    }
}
