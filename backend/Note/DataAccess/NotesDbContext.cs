using Microsoft.EntityFrameworkCore;
using Pet_Project_Note.Models;

namespace Pet_Project_Note.DataAccess
{
    public class NotesDbContext : DbContext
    {

        private readonly IConfiguration _configuration;

        public DbSet<Note> Notes => Set<Note>();

        public NotesDbContext(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql(_configuration.GetConnectionString("Database"));
        }
    }
}
