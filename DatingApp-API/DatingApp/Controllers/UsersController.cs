using AutoMapper;
using DatingApp.Data;
using DatingApp.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DatingApp.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly IDatingAppRepository _datingAppRepository;
        private readonly IConfiguration _configuration;
        private readonly IMapper _mapper;

        public UsersController(
            IDatingAppRepository datingAppRepository,
            IConfiguration configuration,
            IMapper mapper)
        {
            _datingAppRepository = datingAppRepository;
            _configuration = configuration;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _datingAppRepository.GetUsers();
            var userToReturn = _mapper.Map<IEnumerable<UserForList>>(users);
            return Ok(userToReturn);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _datingAppRepository.GetUser(id);
            var userToReturn = _mapper.Map<UserForDetailed>(user);
            return Ok(userToReturn);
        }
    }
}
