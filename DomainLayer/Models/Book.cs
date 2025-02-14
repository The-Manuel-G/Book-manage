using System.ComponentModel.DataAnnotations;

namespace DomainLayer.Models
{
    public class Book
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "El título es obligatorio.")]
        [MaxLength(200, ErrorMessage = "El título no puede tener más de 200 caracteres.")]
        public string? Title { get; set; }

        public string? Description { get; set; }

        [Range(1, int.MaxValue, ErrorMessage = "El número de páginas debe ser mayor a 0.")]
        public int PageCount { get; set; }

        public string? Excerpt { get; set; }
        public DateTime PublishDate { get; set; }
    }
}
