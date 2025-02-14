using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using DomainLayer.Models;

namespace InfrastructureLayer.Repositories
{
    public interface IActivityRepository
    {
        Task<IEnumerable<Activity>> GetActivities();
    }
}
