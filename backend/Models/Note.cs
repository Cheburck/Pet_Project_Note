namespace Pet_Project_Note.Models
{
    public class Note
    {
        public Note(string title, string description)
        {
            Title = title;
            Description = description;
            CreatedDate = DateTime.UtcNow;
        }

        public Guid Id { get; init; }

        public string Title { get; init; }

        public string Description { get; init; }

        public DateTime CreatedDate { get; init; }
    }
}
