using Microsoft.EntityFrameworkCore;
using API_TopicosE;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configurando o EF Core com SQLite
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=musicas.db"));


// Configurando o CORS
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();
app.UseCors();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// GET: lista todos as musicas
app.MapGet("/musicas", (AppDbContext db) =>
{
    var listaMusicas = db.TabelaMusicas.ToList();
    return Results.Ok(listaMusicas);
});

// GET: pega a musica pelo ID
app.MapGet("/musicas/{id}", async(int id, AppDbContext db) =>
{
    var musica = await db.TabelaMusicas.FindAsync(id);
    return musica is not null ? Results.Ok(musica) : Results.NotFound("Musica não encontrada!");

});

// POST: adiciona uma nova musica
app.MapPost("/musicas", async(AppDbContext db, Musica musica) =>
{
    db.TabelaMusicas.Add(musica);
    await db.SaveChangesAsync();
    return Results.Created($"musicas/{musica.Id}", musica);
});

// PUT: atualiza uma musica existente
app.MapPut("/musicas/{id}", async(int id, AppDbContext db, Musica updatedMusica) =>
{
    var musicaAtual = await db.TabelaMusicas.FindAsync(id);
    if(musicaAtual == null){
        return Results.NotFound("Música não encontrada!");
    }
    musicaAtual.Nome = updatedMusica.Nome;
    musicaAtual.Artista = updatedMusica.Artista;
    musicaAtual.Album = updatedMusica.Album;
    musicaAtual.Duracao = updatedMusica.Duracao;
    musicaAtual.Url = updatedMusica.Url;
    await db.SaveChangesAsync();

    return Results.Ok(musicaAtual);
});
// DELETE: remove uma musica
app.MapDelete("/musicas/{id}", async(int id, AppDbContext db) =>
{
    var musica = await db.TabelaMusicas.FindAsync(id);
    if(musica == null){
        return Results.NotFound("Música não encontrada!");
    }
    db.TabelaMusicas.Remove(musica);
    await db.SaveChangesAsync();

    return Results.Ok("Música removida com sucesso!");

});
app.Run();