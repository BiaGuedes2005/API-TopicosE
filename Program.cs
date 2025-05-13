using Microsoft.EntityFrameworkCore;
using API_TopicosE;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


// Configurando o EF Core com SQLite
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=produtos.db"));


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

// GET: lista todos os produtos
app.MapGet("/produtos", (AppDbContext db) =>
{
    var listaProdutos = db.TabelaProdutos.ToList();
    return Results.Ok(listaProdutos);
});

// GET: pega o produto pelo ID
app.MapGet("/produtos/{id}", async(int id, AppDbContext db) =>
{
    var produto = await db.TabelaProdutos.FindAsync(id);
    return produto is not null ? Results.Ok(produto) : Results.NotFound("Produto não encontrado!");

});

// POST: adiciona um novo produto
app.MapPost("/produtos", async(AppDbContext db, Produto produto) =>
{
    db.TabelaProdutos.Add(produto);
    await db.SaveChangesAsync();
    return Results.Created($"produtos/{produto.Id}", produto);
});

// PUT: atualiza um produto existente
app.MapPut("/produtos/{id}", async(int id, AppDbContext db, Produto updatedProduto) =>
{
    var produtoAtual = await db.TabelaProdutos.FindAsync(id);
    if(produtoAtual == null){
        return Results.NotFound("Produto não encontrado!");
    }
    produtoAtual.Nome = updatedProduto.Nome;
    produtoAtual.Preco = updatedProduto.Preco;
    await db.SaveChangesAsync();

    return Results.Ok(produtoAtual);
});
// DELETE: remove um produto
app.MapDelete("/produtos/{id}", async(int id, AppDbContext db) =>
{
    var produto = await db.TabelaProdutos.FindAsync(id);
    if(produto == null){
        return Results.NotFound("Produto não encontrado!");
    }
    db.TabelaProdutos.Remove(produto);
    await db.SaveChangesAsync();

    return Results.Ok("Produto removido com sucesso!");

});
app.Run();