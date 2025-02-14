using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.Testing;
using Xunit;
using Book_manage; // Ajusta al nombre real de tu proyecto con Program.cs
using System.Net.Http.Json;
using DomainLayer.Models;
using Microsoft.VisualStudio.TestPlatform.TestHost;

namespace Library_Test
{

    public class BooksControllerTests : IClassFixture<WebApplicationFactory<Program>>
    {
        private readonly HttpClient _client;

        public BooksControllerTests(WebApplicationFactory<Program> factory)
        {
            // Creamos un cliente que levanta la app en memoria
            _client = factory.CreateClient();
        }

        [Fact]
        public async Task GetBooks_ReturnsOk()
        {
            // Act
            var response = await _client.GetAsync("/api/Books");

            // Assert
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        }

        [Fact]
        public async Task CreateBook_ReturnsCreatedBook()
        {
            // Arrange
            var newBook = new Book
            {
               

                  Id = 1,
                Title = "Book 1",
                PageCount = 100,
                PublishDate = "2025-02-13T08:33:14.7568775-04:00"


            };

            // Act
            var response = await _client.PostAsJsonAsync("/api/Books", newBook);

            // Assert
            response.EnsureSuccessStatusCode(); // Lanza excepción si no es 2xx
            var createdBook = await response.Content.ReadFromJsonAsync<Book>();
            Assert.NotNull(createdBook);
            Assert.Equal("Libro de integración", createdBook!.Title);

            
        }
    }
}
