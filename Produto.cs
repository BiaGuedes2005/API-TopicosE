using System.ComponentModel.DataAnnotations;

namespace API_TopicosE
{
    public class Produto
    {
        public int Id { get; set; }
        [Required]
        public string? Nome { get; set; }
        public decimal Preco { get; set; }
    }
}