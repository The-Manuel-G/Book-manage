using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


using ApplicationLayer.Interfaces;
using DomainLayer.Models;

namespace InfrastructureLayer.Repositories
{
    public class ActivityRepository : IActivityRepository
    {
        private readonly IExternalApiService _externalApiService;

        public ActivityRepository(IExternalApiService externalApiService)
        {
            _externalApiService = externalApiService;
        }

        public async Task<IEnumerable<Activity>> GetActivities()
        {
            return await _externalApiService.GetActivities();
        }
    }
}
