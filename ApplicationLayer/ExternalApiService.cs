using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;
using ApplicationLayer.Interfaces;
using DomainLayer.Models;
using Microsoft.Extensions.Logging;

namespace ApplicationLayer.Services
{
    public class ExternalApiService : IExternalApiService
    {
        private readonly HttpClient _httpClient;
        private readonly ILogger<ExternalApiService> _logger;
        private const string BaseUrl = "https://fakerestapi.azurewebsites.net/api/v1";

        public ExternalApiService(HttpClient httpClient, ILogger<ExternalApiService> logger)
        {
            _httpClient = httpClient;
            _logger = logger;
        }

        public async Task<IEnumerable<Book>> GetAllBooks()
        {
            return await HandleApiCall(async () =>
                await _httpClient.GetFromJsonAsync<List<Book>>($"{BaseUrl}/Books") ?? new List<Book>());
        }

        public async Task<Book> GetBookById(int id)
        {
            return await HandleApiCall(async () =>
            {
                var book = await _httpClient.GetFromJsonAsync<Book>($"{BaseUrl}/Books/{id}");
                if (book is null)
                {
                    throw new KeyNotFoundException($"No se encontró el libro con el id {id}.");
                }
                return book;
            });
        }

        public async Task<Book> CreateBook(Book book)
        {
            return await HandleApiCall(async () =>
            {
                var response = await _httpClient.PostAsJsonAsync($"{BaseUrl}/Books", book);
                response.EnsureSuccessStatusCode();
                var createdBook = await response.Content.ReadFromJsonAsync<Book>();
                if (createdBook is null)
                {
                    throw new Exception("La creación del libro no retornó datos.");
                }
                return createdBook;
            });
        }

        public async Task<Book> UpdateBook(int id, Book book)
        {
            return await HandleApiCall(async () =>
            {
                var response = await _httpClient.PutAsJsonAsync($"{BaseUrl}/Books/{id}", book);
                response.EnsureSuccessStatusCode();
                var updatedBook = await response.Content.ReadFromJsonAsync<Book>();
                if (updatedBook is null)
                {
                    throw new Exception("La actualización del libro no retornó datos.");
                }
                return updatedBook;
            });
        }

        public async Task<bool> DeleteBook(int id)
        {
            return await HandleApiCall(async () =>
            {
                var response = await _httpClient.DeleteAsync($"{BaseUrl}/Books/{id}");
                response.EnsureSuccessStatusCode();
                return response.IsSuccessStatusCode;
            });
        }

        public async Task<Author> GetAuthorById(int id)
        {
            return await HandleApiCall(async () =>
            {
                var author = await _httpClient.GetFromJsonAsync<Author>($"{BaseUrl}/Authors/{id}");
                if (author is null)
                {
                    throw new KeyNotFoundException($"Autor con ID {id} no encontrado");
                }
                return author;
            });
        }

        public async Task<CoverPhoto> GetCoverPhotoById(int id)
        {
            return await HandleApiCall(async () =>
            {
                var coverPhoto = await _httpClient.GetFromJsonAsync<CoverPhoto>($"{BaseUrl}/CoverPhotos/{id}");
                if (coverPhoto is null)
                {
                    throw new KeyNotFoundException($"CoverPhoto con ID {id} no encontrado");
                }
                return coverPhoto;
            });
        }

        public async Task<IEnumerable<Author>> GetAuthors()
        {
            return await HandleApiCall(async () =>
                await _httpClient.GetFromJsonAsync<List<Author>>($"{BaseUrl}/Authors") ?? new List<Author>());
        }

        public async Task<IEnumerable<Activity>> GetActivities()
        {
            return await HandleApiCall(async () =>
                await _httpClient.GetFromJsonAsync<List<Activity>>($"{BaseUrl}/Activities") ?? new List<Activity>());
        }

        public async Task<IEnumerable<CoverPhoto>> GetCoverPhotos()
        {
            return await HandleApiCall(async () =>
                await _httpClient.GetFromJsonAsync<List<CoverPhoto>>($"{BaseUrl}/CoverPhotos") ?? new List<CoverPhoto>());
        }

        public async Task<IEnumerable<User>> GetUsers()
        {
            return await HandleApiCall(async () =>
                await _httpClient.GetFromJsonAsync<List<User>>($"{BaseUrl}/Users") ?? new List<User>());
        }

        /// <summary>
        /// Método genérico para manejar errores en las llamadas HTTP.
        /// </summary>
        private async Task<T> HandleApiCall<T>(Func<Task<T>> apiCall)
        {
            try
            {
                return await apiCall();
            }
            catch (HttpRequestException ex)
            {
                _logger.LogError($"Error en la API externa: {ex.Message}");
                throw new Exception("Error en la comunicación con el servicio externo.");
            }
            catch (KeyNotFoundException ex)
            {
                _logger.LogWarning(ex.Message);
                throw;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error inesperado: {ex.Message}");
                throw new Exception("Se ha producido un error inesperado en la API.");
            }
        }
    }
}
