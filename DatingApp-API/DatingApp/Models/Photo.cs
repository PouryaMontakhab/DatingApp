using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace DatingApp.Models
{
    public class Photo
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public string  Description { get; set; }
        public DateTime DateAdded { get; set; }
        public bool IsMain { get; set; }

        public int UserId { get; set; }
        [ForeignKey(nameof(UserId))]
        public User User { get; set; }

    }
}
