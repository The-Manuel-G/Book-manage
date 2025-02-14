using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace DomainLayer.Models
{
    public class Activity
    {
        public int Id { get; set; }
        public string? Title { get; set; }
        public DateTime DueDate { get; set; }
        public bool Completed { get; set; }
    }
}
