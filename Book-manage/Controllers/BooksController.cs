using ApplicationLayer.Interfaces;
using DomainLayer.Models;
using InfrastructureLayer.Repositories;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Book_manage.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly IBookRepository _bookRepository;

        // Inyecta IBookRepository en el constructor
        public BooksController(IBookRepository bookRepository)
        {
            _bookRepository = bookRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetBooks()
        {
            var books = await _bookRepository.GetAllBooks();
            return Ok(books);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetBook(int id)
        {
            var book = await _bookRepository.GetBookById(id);
            if (book == null)
                return NotFound();
            return Ok(book);
        }

        [HttpPost]
        public async Task<IActionResult> AddBook([FromBody] Book book)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState); // Retorna errores de validación

            var createdBook = await _bookRepository.CreateBook(book);
            if (createdBook == null)
                return StatusCode(500, "Error al crear el libro.");

            return CreatedAtAction(nameof(GetBook), new { id = createdBook.Id }, createdBook);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBook(int id, [FromBody] Book book)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var updatedBook = await _bookRepository.UpdateBook(id, book);
            if (updatedBook == null)
                return StatusCode(500, "Error al actualizar el libro.");

            return Ok(updatedBook);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBook(int id)
        {
            var success = await _bookRepository.DeleteBook(id);
            if (!success)
                return StatusCode(500, "Error al eliminar el libro.");

            return NoContent();
        }
    }
}
