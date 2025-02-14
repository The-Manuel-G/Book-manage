using ApplicationLayer.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Book_manage.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActivitiesController : ControllerBase
    {
        private readonly IExternalApiService _apiService;

        public ActivitiesController(IExternalApiService apiService)
        {
            _apiService = apiService;
        }

        [HttpGet]
        public async Task<IActionResult> GetActivities()
        {
            return Ok(await _apiService.GetActivities());
        }
    }
}
