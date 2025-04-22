using Microsoft.EntityFrameworkCore;

namespace API_TopicosE
{
    public class AppDbContext : DbContext
    {
        // Construtor padrão utilizado pelo ASP.NET via injeção de dependência
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        // Representa a tabela Produto no banco
        public DbSet<Produto> TabelaProdutos => Set<Produto>();
    }
}