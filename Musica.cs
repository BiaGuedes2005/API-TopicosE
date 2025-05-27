using System.ComponentModel.DataAnnotations;

namespace API_TopicosE
{
    public class Musica
    {
        public int Id { get; set; }
        [Required]
        public string? Nome { get; set; }
        public string? Artista { get; set; }
        public string? Album { get; set; }
        public TimeSpan Duracao { get; set; }
        public string? Url { get; set; }
    }
}