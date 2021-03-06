using DatingApp.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatingApp.Data
{
    public class Seed
    {
        public static void SeedUser(DataContext context)
        {
            if (!context.Users.Any())
            {
                var userData = System.IO.File.ReadAllText("Data/UserSeedData.json");
                var users = JsonConvert.DeserializeObject<List<User>>(userData);
                foreach (var user in users)
                {
                    byte[] passwordSalt, passwordHash;
                    CreatePasswordHash("password", out passwordHash, out passwordSalt);

                    user.PasswordSalt = passwordSalt;
                    user.PasswordHash = passwordHash;
                    user.Username = user.Username.ToLower();
                    context.Users.Add(user);

                }
                 context.SaveChanges();

            }
        }

        private static  void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

    }
}
