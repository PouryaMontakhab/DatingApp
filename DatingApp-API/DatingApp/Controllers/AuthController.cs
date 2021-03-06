using AutoMapper;
using DatingApp.Data;
using DatingApp.Dtos;
using DatingApp.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace DatingApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public partial class AuthController : ControllerBase
    {
        private readonly IAuthRepository _authRepo;
        private readonly IConfiguration _configuration;
        private readonly IMapper _mapper;

        public AuthController(
            IAuthRepository authRepo,
            IConfiguration configuration,
            IMapper mapper)
        {
            _authRepo = authRepo;
            _configuration = configuration;
            _mapper = mapper;
        }

        [HttpPost("register")]
        public async virtual Task<IActionResult> Register(UserRegisteration user)
        {

            if (string.IsNullOrEmpty(user.username) || string.IsNullOrEmpty(user.password))
                return BadRequest("username or password can not be empty");

            user.username = user.username.ToLower();
            if (await _authRepo.UserExists(user.username)) return BadRequest("User is alredy exists");


            var userToCreate = _mapper.Map<User>(user);
            var returnUser = _mapper.Map<UserForDetailed>(userToCreate);

            var createdUser = await _authRepo.Register(userToCreate, user.password);

            return CreatedAtRoute("GetUser", new { Controller = "Users" , id = createdUser.Id} , returnUser);

        }

        [HttpPost("login")]
        public async virtual Task<IActionResult> Login(UserLogin user)
        {
            if (string.IsNullOrEmpty(user.username) || string.IsNullOrEmpty(user.password)) return BadRequest("username or password can not be empty");
            var userItem = await _authRepo.Login(user.username.ToLower(), user.password);

            if (user == null) return Unauthorized();

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier,userItem.Id.ToString()),
                new Claim(ClaimTypes.Name,userItem.Username)
            };
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetSection("AppSettings:Token").Value));
            var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = cred
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);

            var userToken = _mapper.Map<UserForList>(userItem);

            return Ok(new
            {
                token = tokenHandler.WriteToken(token),
                userToken
            });



        }

    }
}
