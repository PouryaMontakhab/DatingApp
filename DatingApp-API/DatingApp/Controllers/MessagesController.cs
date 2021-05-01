using AutoMapper;
using DatingApp.Data;
using DatingApp.Dtos;
using DatingApp.Helper;
using DatingApp.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace DatingApp.Controllers
{
    [ServiceFilter(typeof(LogUserActivityActionFilter))]
    [Authorize]
    [Route("api/users/{userId}/[controller]")]
    [ApiController]
    public class MessagesController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IDatingAppRepository _datingRepository;
        public MessagesController(IMapper mapper, IDatingAppRepository datingRepository)
        {
            _mapper = mapper;
            _datingRepository = datingRepository;
        }

        [HttpGet("{id}", Name = "GetMessage")]
        public async Task<IActionResult> GetMessage(int userId, int id)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var message = await _datingRepository.GetMessage(id);

            if (message == null)
                return NotFound();

            return Ok(message);
        }

        [HttpPost]
        public async Task<IActionResult> CreateMessage(int userId, MessageForCreateionDto messageForCreateionDto)
        {
            var sender = await _datingRepository.GetUser(userId);
            if (sender.Id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            messageForCreateionDto.SenderId = userId;

            var recipient = await _datingRepository.GetUser(messageForCreateionDto.RecipientId);
            if (recipient == null) return BadRequest("Could not found user");

            var message = _mapper.Map<Message>(messageForCreateionDto);
            _datingRepository.Add(message);


            if (await _datingRepository.SaveAll())
            {
                var returnMessage = _mapper.Map<MessageForReturn>(message);
                return CreatedAtRoute("GetMessage", new { userId, id = message.Id }, returnMessage);
            }

            throw new Exception("Failed to send message");
        }

        [HttpGet]
        public async Task<IActionResult> GetMessagesForUser(int userId, [FromQuery] MessageParams messageParams)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            messageParams.UserId = userId;
            var messages = await _datingRepository.GetMessagesForUser(userId, messageParams);
            var returnMessages = _mapper.Map<IEnumerable<MessageForReturn>>(messages);

            Response.AddPagination(messages.CurrentPage, messages.PageSize, messages.TotalPages, messages.TotalCount);
            return Ok(returnMessages);
        }

        [HttpGet("thread/{recipientId}")]
        public async Task<IActionResult> GetMessageThread(int userId, int recipientId)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var message = await _datingRepository.GetMessageThread(userId, recipientId);
            var returnMessage = _mapper.Map<IEnumerable<MessageForReturn>>(message);
            return Ok(returnMessage);

        }

        [HttpPost("{id}")]
        public async Task<IActionResult> DeleteMessage(int id, int userId)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var message = await _datingRepository.GetMessage(id);

            if (message.SenderId == userId)
                message.SenderDeleted = true;

            if (message.RecipientId == userId)
                message.RecipientDeleted = true;
            if (message.SenderDeleted && message.RecipientDeleted)
                _datingRepository.Delete(message);

            if (await _datingRepository.SaveAll())
                return NoContent();
            throw new Exception("Failed to delete this message");
        }

        [HttpPost("{id}/read")]
        public async Task<IActionResult> MarkMessageAsRead(int userId , int id)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var message = await _datingRepository.GetMessage(id);

            if (message.RecipientId != userId)
                return Unauthorized();

            message.IsRead = true;
            message.DateRead = DateTime.Now;

            if (await _datingRepository.SaveAll())
                return Ok();

            throw new Exception("Failed to mark as read message");
        }
       
    }
}
