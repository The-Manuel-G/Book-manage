using System.Threading.Tasks;
using ApplicationLayer.Interfaces;
using DomainLayer.Models;

namespace InfrastructureLayer.Repositories
{
    public class CoverPhotoRepository : ICoverPhotoRepository
    {
        private readonly IExternalApiService _externalApiService;

        public CoverPhotoRepository(IExternalApiService externalApiService)
        {
            _externalApiService = externalApiService;
        }

        public async Task<IEnumerable<CoverPhoto>> GetCoverPhotos()
        {
            return await _externalApiService.GetCoverPhotos();
        }

        public async Task<CoverPhoto> GetCoverPhotoById(int id)
        {
            return await _externalApiService.GetCoverPhotoById(id);
        }
    }
}