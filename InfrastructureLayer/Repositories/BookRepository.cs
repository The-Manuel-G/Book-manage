using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using ApplicationLayer.Interfaces;
using DomainLayer.Models;


using System.Collections.Generic;
using System.Threading.Tasks;
using ApplicationLayer.Interfaces;
using DomainLayer.Models;

namespace InfrastructureLayer.Repositories
{
    public class BookRepository : IBookRepository
    {
        private readonly IExternalApiService _externalApiService;

        public BookRepository(IExternalApiService externalApiService)
        {
            _externalApiService = externalApiService;
        }

        public async Task<IEnumerable<Book>> GetAllBooks()
        {
            return await _externalApiService.GetAllBooks();
        }

        public async Task<Book> GetBookById(int id)
        {
            return await _externalApiService.GetBookById(id);
        }

        public async Task<Book> CreateBook(Book book)
        {
            return await _externalApiService.CreateBook(book);
        }

        public async Task<Book> UpdateBook(int id, Book book)
        {
            return await _externalApiService.UpdateBook(id, book);
        }

        public async Task<bool> DeleteBook(int id)
        {
            return await _externalApiService.DeleteBook(id);
        }
    }
}
