using AutoMapper;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using DatingApp.Data;
using DatingApp.Dtos;
using DatingApp.Helper;
using DatingApp.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace DatingApp.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/users/{userId}/photos")]
    public partial class PhotosController : ControllerBase
    {


        private readonly IDatingAppRepository _datingAppRepository;
        private readonly IMapper _mapper;
        private readonly IOptions<CloudinarySettings> _cloudinaryConfig;


        private readonly Cloudinary _cloudinary;

        public PhotosController(IDatingAppRepository datingAppRepository,
            IMapper mapper,
            IOptions<CloudinarySettings> cloudinaryConfig
            )
        {
            _datingAppRepository = datingAppRepository;
            _mapper = mapper;
            _cloudinaryConfig = cloudinaryConfig;
            Account acc = new Account(
                _cloudinaryConfig.Value.CloudName,
                _cloudinaryConfig.Value.ApiKey,
                _cloudinaryConfig.Value.ApiSecret
                );
            _cloudinary = new Cloudinary(acc);
        }

        [HttpGet("{id}", Name = nameof(GetPhoto))]
        public async virtual Task<IActionResult> GetPhoto(int id)
        {
            var photo = await _datingAppRepository.GetPhoto(id);

            var returnphoto = _mapper.Map<PhotoForReturn>(photo);
            return Ok(returnphoto);
        }


        [HttpPost]
        public async virtual Task<IActionResult> AddPhotoForUser(int userId, [FromForm] PhotoForCreation photoForCreation)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var user = await _datingAppRepository.GetUser(userId);

            var file = photoForCreation.File;
            var uploadResult = new ImageUploadResult();
            if (file.Length > 0)
            {
                using (var stream = file.OpenReadStream())
                {

                    var uploadParams = new ImageUploadParams()
                    {
                        File = new FileDescription(file.FileName, stream),
                        Transformation = new Transformation()
                        .Width(500).Height(500).Crop("fill").Gravity("face")
                    };
                    uploadResult = _cloudinary.Upload(uploadParams);
                }
            }

            photoForCreation.Url = uploadResult.Url.ToString();
            photoForCreation.PublicId = uploadResult.PublicId;

            var photo = _mapper.Map<Photo>(photoForCreation);
            if (!user.Photos.Any(u => u.IsMain))
                photo.IsMain = true;

            user.Photos.Add(photo);

            if (await _datingAppRepository.SaveAll())
            {
                var photoToReturn = _mapper.Map<PhotoForReturn>(photo);
                return CreatedAtRoute(nameof(GetPhoto), new { userId, id = photo.Id }, photoToReturn);
            }

            return BadRequest("could not add photo");

        }

        [HttpPost("{id}/setMain")]
        public async Task<IActionResult> SetMainPhoto(int userId , int id)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var user = await _datingAppRepository.GetUser(userId);
            if (!user.Photos.Any(p => p.Id == id))
                return Unauthorized();

            var photo = await _datingAppRepository.GetPhoto(id);
            if (photo.IsMain) return BadRequest("This photo is already the main photo");

            var currentMainPhoto = user.Photos.FirstOrDefault(p => p.IsMain);
            currentMainPhoto.IsMain = false;
            photo.IsMain = true;

            if (await _datingAppRepository.SaveAll())
                return NoContent();

            return BadRequest("Could not set photo to main");


        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePhoto(int userId , int id)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var user = await _datingAppRepository.GetUser(userId);
            if (!user.Photos.Any(p => p.Id == id))
                return Unauthorized();

            var photo = await _datingAppRepository.GetPhoto(id);
            if (photo.IsMain) return BadRequest("You cannot delete the main photo");

            if (!string.IsNullOrEmpty(photo.PublicId))
            {
                var deleteParams = new DeletionParams(photo.PublicId);
                var result = await _cloudinary.DestroyAsync(deleteParams);

                if(result.Result == "ok") {
                    _datingAppRepository.Delete(photo);
                }
            }
            else
            {
                _datingAppRepository.Delete(photo);
            }

            if (await _datingAppRepository.SaveAll())
                return Ok();

            return BadRequest("Failed to delet the photo");
        }

    }
}
