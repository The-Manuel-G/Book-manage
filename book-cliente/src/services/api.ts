// src/services/api.ts
export interface Book {
    id?: number;
    title: string;
    description?: string;
    pageCount: number;
    excerpt?: string;
    publishDate: string;
    // Opcional: imageUrl si lo deseas
}

// Interfaz para las cover photos (imágenes de portada)
export interface CoverPhoto {
    id: number;
    idBook: number;
    url: string; // Se usa "url" en minúsculas para facilitar el acceso
}

// Interfaz para los autores
export interface Author {
    id: number;
    idBook: number;
    firstName?: string;
    lastName?: string;
}

// Se verifica si está definida la variable de entorno para Vite o para Create React App.
// Asegúrate de configurar la variable correspondiente en tu archivo .env
const API_BASE_URL = import.meta.env.VITE_API_URL;

// =======================
// Funciones para los Libros
// =======================
export async function getBooks(): Promise<Book[]> {
    const response = await fetch(`${API_BASE_URL}/Books`);
    if (!response.ok) {
        alert("Error al obtener los libros");
        throw new Error("Error al obtener los libros");
    }
    return response.json();
}

export async function getBookById(id: number): Promise<Book> {
    const response = await fetch(`${API_BASE_URL}/Books/${id}`);
    if (!response.ok) {
        alert("Error al obtener el libro");
        throw new Error("Error al obtener el libro");
    }
    return response.json();
}

export async function createBook(book: Book): Promise<Book> {
    const response = await fetch(`${API_BASE_URL}/Books`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(book),
    });
    if (!response.ok) {
        const error = await response.text();
        alert(error || "Error al crear el libro");
        throw new Error(error);
    }
    return response.json();
}

export async function updateBook(id: number, book: Book): Promise<Book> {
    const response = await fetch(`${API_BASE_URL}/Books/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(book),
    });
    if (!response.ok) {
        const error = await response.text();
        alert(error || "Error al actualizar el libro");
        throw new Error(error);
    }
    return response.json();
}

export async function deleteBook(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/Books/${id}`, {
        method: "DELETE",
    });
    if (!response.ok) {
        const error = await response.text();
        alert(error || "Error al eliminar el libro");
        throw new Error(error);
    }
    // Se espera que la respuesta no tenga contenido (NoContent)
}

// =======================
// Funciones para las Cover Photos
// =======================
export async function getCoverPhotos(): Promise<CoverPhoto[]> {
    const response = await fetch(`${API_BASE_URL}/CoverPhotos`);
    if (!response.ok) {
        alert("Error al obtener las imágenes");
        throw new Error("Error al obtener las imágenes");
    }
    return response.json();
}

export async function getCoverPhotosByBook(bookId: number): Promise<CoverPhoto[]> {
    const response = await fetch(`${API_BASE_URL}/CoverPhotos/by-book/${bookId}`);
    if (!response.ok) {
        alert("Error al obtener la imagen del libro");
        throw new Error("Error al obtener la imagen del libro");
    }
    return response.json();
}

// =======================
// Funciones para los Autores
// =======================
export async function getAuthors(): Promise<Author[]> {
    const response = await fetch(`${API_BASE_URL}/Authors`);
    if (!response.ok) {
        alert("Error al obtener los autores");
        throw new Error("Error al obtener los autores");
    }
    return response.json();
}

export async function getAuthorById(id: number): Promise<Author> {
    const response = await fetch(`${API_BASE_URL}/Authors/${id}`);
    if (!response.ok) {
        alert("Error al obtener el autor");
        throw new Error("Error al obtener el autor");
    }
    return response.json();
}
