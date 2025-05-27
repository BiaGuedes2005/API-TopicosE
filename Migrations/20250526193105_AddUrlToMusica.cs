using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API_TopicosE.Migrations
{
    /// <inheritdoc />
    public partial class AddUrlToMusica : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Url",
                table: "TabelaMusicas",
                type: "TEXT",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Url",
                table: "TabelaMusicas");
        }
    }
}
