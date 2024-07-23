namespace Pet_Project_Note.Contracts;

public record NoteDto(Guid Id, string Title, string Desription, DateTime CreatedDate);
