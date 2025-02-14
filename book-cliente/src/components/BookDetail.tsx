// src/components/BookDetail.tsx
import React, { useEffect, useState } from "react";
import {
    getBookById,
    getCoverPhotosByBook,
    getAuthors,
    Book,
    CoverPhoto,
    Author
} from "../services/api";
import { useParams, Link } from "react-router-dom";

const BookDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [book, setBook] = useState<Book | null>(null);
    const [coverPhoto, setCoverPhoto] = useState<CoverPhoto | null>(null);
    const [authors, setAuthors] = useState<Author[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // Obtiene el libro por su ID
    useEffect(() => {
        if (id) {
            getBookById(parseInt(id))
                .then((data) => setBook(data))
                .catch((err) => console.error(err))
                .finally(() => setIsLoading(false));
        }
    }, [id]);

    // Una vez que se carga el libro, obtiene la cover photo y los autores asociados
    useEffect(() => {
        if (book && book.id) {
            // Obtener cover photo para el libro
            getCoverPhotosByBook(book.id)
                .then((photos) => {
                    if (photos && photos.length > 0) {
                        setCoverPhoto(photos[0]);
                    }
                })
                .catch((err) => console.error("Error al obtener la imagen:", err));

            // Obtener autores y filtrar por el id del libro
            getAuthors()
                .then((allAuthors) => {
                    const filtered = allAuthors.filter((author) => author.idBook === book.id);
                    setAuthors(filtered);
                })
                .catch((err) => console.error("Error al obtener los autores:", err));
        }
    }, [book]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-100 to-purple-100">
                <div className="flex flex-col items-center">
                    <svg
                        className="animate-spin -ml-1 mr-3 h-10 w-10 text-blue-600"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        ></circle>
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v8H4z"
                        ></path>
                    </svg>
                    <p className="text-blue-600 mt-4 text-lg">Cargando detalles...</p>
                </div>
            </div>
        );
    }

    if (!book) {
        return (
            <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-100 to-purple-100">
                <p className="text-xl text-red-600">No se encontro el libro.</p>
                <Link
                    to="/"
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 transition"
                >
                    Volver a la lista
                </Link>
            </div>
        );
    }

    // Formatear el nombre del autor o autores
    const authorNames =
        authors.length > 0
            ? authors.map((a) => `${a.firstName || ""} ${a.lastName || ""}`.trim()).join(", ")
            : "Sin autor asignado";

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center p-4">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-2xl w-full">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">
                    Detalle del Libro
                </h1>
                {/* Sección de imagen y título/autor */}
                <div className="flex flex-col md:flex-row mb-6">
                    <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                        <img
                            src={coverPhoto ? coverPhoto.url : "https://via.placeholder.com/250x350"}
                            alt={book.title}
                            className="w-48 h-auto rounded shadow"
                        />
                    </div>
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                            {book.title}
                        </h2>
                        <p className="text-gray-700">Autor: {authorNames}</p>
                    </div>
                </div>
                <div className="mb-6">
                    <p className="text-gray-700">{book.description}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <div className="p-4 border rounded-lg">
                        <p className="text-gray-600 text-sm">Numero de paginas</p>
                        <p className="text-lg font-medium text-gray-800">
                            {book.pageCount}
                        </p>
                    </div>
                    <div className="p-4 border rounded-lg">
                        <p className="text-gray-600 text-sm">Fecha de Publicacion</p>
                        <p className="text-lg font-medium text-gray-800">
                            {new Date(book.publishDate).toLocaleDateString()}
                        </p>
                    </div>
                </div>
                <div className="mb-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Extracto</h3>
                    <p className="text-gray-700">{book.excerpt}</p>
                </div>
                <Link
                    to="/"
                    className="inline-block mt-4 px-6 py-2 bg-blue-500 text-white rounded-full shadow hover:bg-blue-600 transition"
                >
                    Volver a la lista
                </Link>
            </div>
        </div>
    );
};

export default BookDetail;
