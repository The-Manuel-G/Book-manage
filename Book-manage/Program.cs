using ApplicationLayer.Interfaces;
using ApplicationLayer.Services;
using InfrastructureLayer.Repositories;
using InfrastructureLayer.Middleware;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

var builder = WebApplication.CreateBuilder(args);

// Inyectar servicios y repositorios
builder.Services.AddHttpClient<IExternalApiService, ExternalApiService>();
builder.Services.AddScoped<IBookRepository, BookRepository>();
builder.Services.AddScoped<IAuthorRepository, AuthorRepository>();
builder.Services.AddScoped<IActivityRepository, ActivityRepository>();
builder.Services.AddScoped<ICoverPhotoRepository, CoverPhotoRepository>();

builder.Services.AddControllers();

// Agregar Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options => {
    options.AddPolicy("AllowAll", policy => {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();

    // Habilitar Swagger en Desarrollo
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "TaskManager API v1");
        c.RoutePrefix = "swagger"; // Esto asegura que Swagger esté en /swagger
    });
}
else
{
    // Activar el Middleware de Excepciones en Producción
    app.UseMiddleware<ExceptionMiddleware>();
}

app.UseRouting();
app.UseCors("AllowAll"); 
app.UseAuthorization();
app.MapControllers();

app.Run();
