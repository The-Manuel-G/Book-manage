using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DomainLayer.Models
{
    public class CoverPhoto
    {
        public int Id { get; set; }
        public int IdBook { get; set; }
        public string? Url { get; set; }
    }
}
