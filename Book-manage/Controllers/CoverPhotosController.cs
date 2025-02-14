using ApplicationLayer.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Book_manage.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CoverPhotosController : ControllerBase
    {
        private readonly ICoverPhotoRepository _coverPhotoRepository;

        public CoverPhotosController(ICoverPhotoRepository coverPhotoRepository)
        {
            _coverPhotoRepository = coverPhotoRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetCoverPhotos()
        {
            var coverPhotos = await _coverPhotoRepository.GetCoverPhotos();
            return Ok(coverPhotos);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCoverPhotoById(int id)
        {
            try
            {
                var coverPhoto = await _coverPhotoRepository.GetCoverPhotoById(id);
                return Ok(coverPhoto);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("by-book/{bookId}")]
        public async Task<IActionResult> GetCoverPhotosByBook(int bookId)
        {
            var coverPhotos = await _coverPhotoRepository.GetCoverPhotos();
            var filteredPhotos = coverPhotos.Where(cp => cp.IdBook == bookId);
            return Ok(filteredPhotos);
        }
    }
}