using DatingApp.Helper;
using DatingApp.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatingApp.Data
{
    public class DatingAppRepository : IDatingAppRepository
    {
        private readonly DataContext _context;
        public DatingAppRepository(DataContext context)
        {
            _context = context;
        }
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<User> GetUser(int id)
        {
            return await _context.Users.Include(u => u.Photos).FirstOrDefaultAsync(u => u.Id == id);

        }

        public async Task<Photo> GetPhoto(int id)
        {
            var photo = await _context.Photo.FirstOrDefaultAsync(p=>p.Id == id);
            return photo;
            throw new Exception();
        }

        public async Task<PagedList<User>> GetUsers(UserFilterParams userFilterParams)
        {
            var users = _context.Users.Include(u => u.Photos).OrderByDescending(u=>u.LastActive).AsQueryable();
            
            //Filter Section 
            users = users.Where(u => u.Id != userFilterParams.UserId);
            users = users.Where(u => u.Gender == userFilterParams.Gender);
            if(userFilterParams.MinAge != 18 || userFilterParams.MaxAge != 99)
            {
                var minDob = DateTime.Today.AddYears(-userFilterParams.MaxAge - 1);
                var maxDob = DateTime.Today.AddYears(-userFilterParams.MinAge);

                users = users.Where(u => u.DateOfBirth >= minDob && u.DateOfBirth <= maxDob);
            }

            if (!string.IsNullOrEmpty(userFilterParams.OrderBy))
            {
                switch (userFilterParams.OrderBy)
                {
                    case "dateOfBirth":
                        users = users.OrderByDescending(u => u.DateOfBirth);
                        break;
                    default:
                        users = users.OrderByDescending(u => u.LastActive);
                        break;
                }
            }

            return await PagedList<User>.CreateAsync(users, userFilterParams.PageNumber, userFilterParams.PageSize);
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
