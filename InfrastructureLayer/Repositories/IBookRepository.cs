using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using DomainLayer.Models;

namespace InfrastructureLayer.Repositories
{
    public interface IBookRepository
    {
        Task<IEnumerable<Book>> GetAllBooks();
        Task<Book> GetBookById(int id);
        
        Task<Book> CreateBook(Book book);
        Task<Book> UpdateBook(int id, Book book);
        Task<bool> DeleteBook(int id);
    }
}
