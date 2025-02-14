using DomainLayer.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Threading.Tasks;
using DomainLayer.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ApplicationLayer.Interfaces
{
    public interface IExternalApiService
    {
        Task<IEnumerable<Book>> GetAllBooks();
        Task<Book> GetBookById(int id);
        Task<Book> CreateBook(Book book);
        Task<Book> UpdateBook(int id, Book book);
        Task<bool> DeleteBook(int id);
        Task<Author> GetAuthorById(int id);
        Task<IEnumerable<Author>> GetAuthors();
        Task<IEnumerable<Activity>> GetActivities();
        Task<IEnumerable<CoverPhoto>> GetCoverPhotos();
        Task<IEnumerable<User>> GetUsers();
        Task<CoverPhoto> GetCoverPhotoById(int id);
    }
}
