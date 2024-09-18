namespace Pet_Project_Note.Contracts;

public record GetNotesRequest(string? Search, string? SortItem, string? SortOrder);
