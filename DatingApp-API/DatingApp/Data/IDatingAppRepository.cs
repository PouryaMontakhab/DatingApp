using DatingApp.Helper;
using DatingApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatingApp.Data
{
    public interface IDatingAppRepository
    {
        void Add<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        Task<PagedList<User>> GetUsers(UserFilterParams userFilterParams);
        Task<Like> GetLike(int userId, int recipientId);
        Task<Photo> GetPhoto(int id);
        Task<Message> GetMessage(int id);
        Task<PagedList<Message>> GetMessagesForUser(int userId ,MessageParams messageParams);
        Task<IEnumerable<Message>> GetMessageThread(int userId, int recipientId); 
        Task<User> GetUser(int id);
        Task<bool> SaveAll();

    }
}
