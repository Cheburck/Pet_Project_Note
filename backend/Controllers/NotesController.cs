﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Pet_Project_Note.Contracts;
using Pet_Project_Note.DataAccess;
using Pet_Project_Note.Models;
using System.Linq.Expressions;

namespace Pet_Project_Note.Controllers;

[ApiController]
[Route("[controller]")]
public class NotesController : ControllerBase
{
    private readonly NotesDbContext _dbContext;

    public NotesController(NotesDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody]CreateNoteRequest createNoteRequest, CancellationToken ct)
    {
        var note = new Note(createNoteRequest.Title, createNoteRequest.Description);

        await _dbContext.Notes.AddAsync(note, ct);
        await _dbContext.SaveChangesAsync(ct);

        return Ok();
    }

    [HttpGet]
    public async Task<IActionResult> Get([FromQuery]GetNotesRequest getNotesRequest, CancellationToken ct)
    {
        var notesQuery = _dbContext.Notes
            .Where(n => string.IsNullOrWhiteSpace(getNotesRequest.Search) 
                || n.Title.ToLower().Contains(getNotesRequest.Search.ToLower())
                || n.Description.ToLower().Contains(getNotesRequest.Search.ToLower()));

        Expression<Func<Note, Object>> selectorKey = getNotesRequest.SortItem switch
        {
            "date" => n => n.CreatedDate,
            "title" => n => n.Title,
            _ => n => n.Id
        };
        
        notesQuery = getNotesRequest.SortOrder == "asc"
            ? notesQuery.OrderBy(selectorKey)
            : notesQuery.OrderByDescending(selectorKey);

        var noteDtos = await notesQuery
            .Select(n => new NoteDto(n.Id, n.Title, n.Description, n.CreatedDate))
            .ToListAsync(ct);
        
        return Ok(new GetNotesResponse(noteDtos));
    }

    [HttpDelete]
    public async Task<IActionResult> Delete([FromBody] DeleteNoteRequest deleteNoteRequest, CancellationToken ct)
    {
        await _dbContext.Notes
            .Where(note => note.Id == deleteNoteRequest.Id)
            .ExecuteDeleteAsync(ct);

        return Ok();
    }

    [HttpPut]
    public async Task<IActionResult> Update([FromBody] UpdateNoteRequest updateNoteRequest, CancellationToken ct)
    {
        await Delete(new DeleteNoteRequest(updateNoteRequest.Id), ct);
        await Create(new CreateNoteRequest(updateNoteRequest.Title, updateNoteRequest.Description), ct);

        return Ok();
    }
}

