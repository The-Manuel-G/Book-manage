using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ApplicationLayer.Interfaces;
using DomainLayer.Models;

namespace InfrastructureLayer.Repositories
{
    public class AuthorRepository : IAuthorRepository
    {
        private readonly IExternalApiService _externalApiService;

        public AuthorRepository(IExternalApiService externalApiService)
        {
            _externalApiService = externalApiService;
        }

        public async Task<IEnumerable<Author>> GetAuthors()
        {
            return await _externalApiService.GetAuthors();
        }

        public async Task<Author> GetAuthorById(int id)
        {
            var authors = await _externalApiService.GetAuthors();
            return authors.FirstOrDefault(a => a.Id == id);
        }
    }
}