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
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _authRepo;
        private readonly IConfiguration _configuration;

        public AuthController(
            IAuthRepository authRepo,
            IConfiguration configuration)
        {
            _authRepo = authRepo;
            _configuration = configuration;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserRegisteration user)
        {

            if (string.IsNullOrEmpty(user.username) || string.IsNullOrEmpty(user.password))
                return BadRequest("username or password can not be empty");

            user.username = user.username.ToLower();
            if (await _authRepo.UserExists(user.username)) return BadRequest("User is alredy exists");


            var userToCreate = new User
            {
                Username = user.username
            };



            var createdUser = await _authRepo.Register(userToCreate, user.password);

            return StatusCode(201);

        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserLogin user)
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

            return Ok(new
            {
                token = tokenHandler.WriteToken(token)
            });



        }

    }
}
