using DatingApp.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq; 
using System.Threading.Tasks;

namespace DatingApp.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class ValuesController : ControllerBase
    {


        private readonly ILogger<ValuesController> _logger;
        private readonly DataContext _context;

        public ValuesController(ILogger<ValuesController> logger,
            DataContext contex)
        {
            _logger = logger;
            _context = contex;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var values = await _context.Values.ToListAsync();
            return Ok(values);
        }

        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> Get(int id)
        {
            var value = await _context.Values.FirstOrDefaultAsync(v=>v.Id == id);
            return Ok(value);
        }
    }
}
