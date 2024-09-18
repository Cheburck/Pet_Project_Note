using DotNetEnv;
using Pet_Project_Note.DataAccess;

Env.Load();

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSwaggerGen();
builder.Services.AddControllers();
builder.Services.AddScoped<NotesDbContext>();

var allowedOrigin = Environment.GetEnvironmentVariable("CORS_ALLOWED_ORIGINS").Split(',');

builder.Services.AddCors(options =>
{
    if (allowedOrigin != null && allowedOrigin.Length >= 1)
    {
        options.AddDefaultPolicy(policy =>
        {
            policy
                //.AllowAnyOrigin()
                .WithOrigins(allowedOrigin)
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
    }
    else
    {
        Console.Error.WriteLine("Frontend url not set");
        throw new ArgumentNullException("Frontend url not set");
    }
});
var app = builder.Build();

using var scope = app.Services.CreateScope();
await using var dbContext = scope.ServiceProvider.GetRequiredService<NotesDbContext>();
await dbContext.Database.EnsureCreatedAsync();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Notes API");
        c.RoutePrefix = Environment.GetEnvironmentVariable("DB_SERVER") == "localhost" ? c.RoutePrefix : string.Empty;
    });
}

app.UseCors();
app.MapControllers();

app.Run();
