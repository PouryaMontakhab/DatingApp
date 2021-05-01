using DatingApp.Models;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> option):base(option)
        {

        }

        public DbSet<Value> Values { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Photo> Photo { get; set; }
        public DbSet<Like> Like { get; set; }
        public DbSet<Message> Messages { get; set; }



        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Like>()
                .HasKey(k => new { k.LikerId, k.LikeeId });

            modelBuilder.Entity<Like>()
                .HasOne(u => u.Likee)
                .WithMany(l => l.Likers)
                .HasForeignKey(u => u.LikeeId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Like>()
               .HasOne(u => u.Liker)
               .WithMany(l => l.Likees)
               .HasForeignKey(u => u.LikerId)
               .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Message>()
               .HasOne(u => u.Sender)
               .WithMany(l => l.MessagesSent)
               .HasForeignKey(u => u.SenderId)
               .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Message>()
               .HasOne(u => u.Recipient)
               .WithMany(l => l.MessagesRecieved)
               .HasForeignKey(u => u.RecipientId)
               .OnDelete(DeleteBehavior.Restrict);
        }

    }
}   