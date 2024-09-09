namespace Pet_Project_Note.Contracts;

public record UpdateNoteRequest(Guid Id, string Title, string Description);
