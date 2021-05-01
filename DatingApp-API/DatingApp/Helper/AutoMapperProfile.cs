using AutoMapper;
using DatingApp.Data;
using DatingApp.Dtos;
using DatingApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatingApp.Helper
{
    public class AutoMapperProfile : Profile
    {

        public AutoMapperProfile()
        {
            CreateMap<User, UserForList>()
                .ForMember(dest => dest.PhotoUrl, opt => opt.MapFrom(src => src.Photos.FirstOrDefault(u => u.IsMain).Url))
                .ForMember(dest => dest.Photos, opt => opt.MapFrom(src => src.Photos))
                .ForMember(dest => dest.Age, opt => opt.MapFrom(src => src.DateOfBirth.CalculateAge()));
            CreateMap<User, UserForDetailed>()
                .ForMember(dest => dest.PhotoUrl, opt => opt.MapFrom(src => src.Photos.FirstOrDefault(u => u.IsMain).Url))
                .ForMember(dest => dest.Age, opt => opt.MapFrom(src => src.DateOfBirth.CalculateAge()));
            CreateMap<Photo, PhotosForDetail>();
            CreateMap<UserForUpdate, User>();
            CreateMap<PhotoForCreation, Photo>();
            CreateMap<Photo, PhotoForReturn>();
            CreateMap<UserRegisteration, User>();
            CreateMap<Message, MessageForCreateionDto>().ReverseMap();
            CreateMap<Message, MessageForReturn>()
                .ForMember(m=>m.SenderPhotoUrl , opt => opt.MapFrom(a=>a.Sender.Photos.FirstOrDefault(p=>p.IsMain).Url))
                .ForMember(m => m.RecipientPhotoUrl, opt => opt.MapFrom(a => a.Recipient.Photos.FirstOrDefault(p => p.IsMain).Url))
                .ReverseMap();
        }
    }
}
