using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using ApplicationLayer.Interfaces;
using ApplicationLayer.Services;
using DomainLayer.Models;
using Moq;
using RichardSzalay.MockHttp;
using Xunit;
using Microsoft.Extensions.Logging;

namespace Library_Test
{
    public class ExternalApiServiceTests
    {

       
            [Fact]
            public async Task GetAllBooks_ReturnsListOfBooks()
            {
                // Arrange
                var mockHttp = new MockHttpMessageHandler();

                // Simulamos la URL que se llama dentro de ExternalApiService
                // Nota: BaseUrl = "https://fakerestapi.azurewebsites.net/api/v1"
                var booksEndpoint = "https://fakerestapi.azurewebsites.net/api/v1/Books";

                // Definimos la respuesta simulada
                mockHttp.When(booksEndpoint)
                        .Respond("application/json",
                            "[{\"id\":1,\"title\":\"Book 1\"}]");

                // Creamos un HttpClient con el mock
                var httpClient = new HttpClient(mockHttp);

                // Mock de ILogger
                var mockLogger = new Mock<ILogger<ExternalApiService>>();

                // Instanciamos el servicio con los mocks
                IExternalApiService service = new ExternalApiService(httpClient, mockLogger.Object);

                // Act
                var books = await service.GetAllBooks();

                // Assert
                Assert.NotNull(books);
                Assert.Single(books); // Solo 1 libro en la respuesta
                Assert.Equal(1, ((List<Book>)books)[0].Id);
                Assert.Equal("Book 1", ((List<Book>)books)[0].Title);
            }

            [Fact]
            public async Task GetBookById_WhenNotFound_ThrowsKeyNotFoundException()
            {
                // Arrange
                var mockHttp = new MockHttpMessageHandler();
                var booksEndpoint = "https://fakerestapi.azurewebsites.net/api/v1/Books/200";

                // Retornamos 404 simulando que el libro no existe
                mockHttp.When(booksEndpoint)
                        .Respond(HttpStatusCode.NotFound);

                var httpClient = new HttpClient(mockHttp);
                var mockLogger = new Mock<ILogger<ExternalApiService>>();
                IExternalApiService service = new ExternalApiService(httpClient, mockLogger.Object);

                // Act & Assert
                await Assert.ThrowsAsync<KeyNotFoundException>(() => service.GetBookById(200));
            }
        }
    
}
