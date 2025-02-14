using DomainLayer.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ApplicationLayer.Interfaces
{
    public interface ICoverPhotoRepository
    {
        Task<IEnumerable<CoverPhoto>> GetCoverPhotos();
        Task<CoverPhoto> GetCoverPhotoById(int id);
    }
}