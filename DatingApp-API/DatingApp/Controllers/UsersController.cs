using AutoMapper;
using DatingApp.Data;
using DatingApp.Dtos;
using DatingApp.Helper;
using DatingApp.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

namespace DatingApp.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    [ServiceFilter(typeof(LogUserActivityActionFilter))]
    public partial class UsersController : ControllerBase
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
        public async virtual Task<IActionResult> GetUsers([FromQuery]UserFilterParams userFilterParams)
        {

            var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            var userItem = await _datingAppRepository.GetUser(currentUserId);
            userFilterParams.UserId = userItem.Id;
            if (string.IsNullOrEmpty(userFilterParams.Gender))
                userFilterParams.Gender = userItem.Gender == "male" ? "female" : "male";



            var users = await _datingAppRepository.GetUsers(userFilterParams);
            

            //Use automapper case 
            var userToReturn = _mapper.Map<IEnumerable<UserForList>>(users);
            Response.AddPagination(users.CurrentPage, users.PageSize, users.TotalPages, users.TotalCount);
            return Ok(userToReturn);
        }

        [HttpGet("{id}" , Name = "GetUser")]
        public async virtual Task<IActionResult> GetUser(int id)
        {
            var user = await _datingAppRepository.GetUser(id);
            var userToReturn = _mapper.Map<UserForDetailed>(user);
            return Ok(userToReturn);
        }

        [HttpPut("{id}")]
        public async virtual Task<IActionResult> UpdateUser(int id , UserForUpdate user)
        {
            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var userItem =await _datingAppRepository.GetUser(id);
             _mapper.Map(user, userItem);

            if (await _datingAppRepository.SaveAll())
                return NoContent();

            throw new Exception($"Updating user {id} failed on save");
        }

        [HttpPost("{id}/like/{recipientId}")]
        public async Task<IActionResult> LikeUser(int id , int recipientId)
        {
            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();
            var like =await  _datingAppRepository.GetLike(id, recipientId);
            if (like != null)
                return BadRequest("You already like this user");

            if (await _datingAppRepository.GetUser(recipientId) == null)
                return NotFound();
            like = new Like
            {
                LikerId = id,
                LikeeId = recipientId
            };

            _datingAppRepository.Add<Like>(like);

            if (await _datingAppRepository.SaveAll())
                return Ok();

            return BadRequest("Failed to like user");
        }
    }
}
