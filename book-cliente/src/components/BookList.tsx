// src/components/BookList.tsx
import React, { useEffect, useState } from "react";
import {
    getBooks,
    deleteBook,
    Book,
    getCoverPhotos,
    CoverPhoto,
} from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BookList: React.FC = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [coverPhotos, setCoverPhotos] = useState<CoverPhoto[]>([]);
    const [selectedBookId, setSelectedBookId] = useState<number | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const navigate = useNavigate();

    // Obtiene los libros de la API
    const fetchBooks = async () => {
        setIsLoading(true);
        try {
            const data = await getBooks();
            setBooks(data);
            toast.success("Conexión exitosa a la base de datos");
        } catch (error) {
            console.error(error);
            toast.error("Error de conexión a la base de datos");
        } finally {
            setIsLoading(false);
        }
    };

    // Obtiene las imágenes de portada de la API
    const fetchCoverPhotos = async () => {
        try {
            const photos = await getCoverPhotos();
            setCoverPhotos(photos);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchBooks();
        fetchCoverPhotos();
    }, []);

    const handleDelete = (id: number) => {
        setSelectedBookId(id);
        setShowModal(true);
    };

    const confirmDelete = async () => {
        if (selectedBookId !== null) {
            try {
                await deleteBook(selectedBookId);
                toast.success("Libro eliminado con éxito");
                fetchBooks(); // Refresca la lista
            } catch (error) {
                console.error(error);
                toast.error("Error al eliminar el libro");
            } finally {
                setShowModal(false);
                setSelectedBookId(null);
            }
        }
    };

    // Filtra los libros por ID cuando se ingresa un valor en el input
    const filteredBooks = searchQuery
        ? books.filter((book) => book.id === Number(searchQuery))
        : books;

    // Esqueleto para mostrar mientras se cargan los datos
    const renderSkeletons = () => (
        <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, index) => (
                <div
                    key={index}
                    className="bg-white shadow rounded p-6 animate-pulse flex flex-col md:flex-row md:items-center"
                >
                    <div className="w-full md:w-1/4 flex justify-center items-center mb-4 md:mb-0">
                        <div className="w-32 h-32 bg-gray-300 rounded"></div>
                    </div>
                    <div className="w-full md:w-3/4 md:pl-4">
                        <div className="h-6 bg-gray-300 rounded w-1/2 mb-2"></div>
                        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <ToastContainer />
            <div className="flex flex-col md:flex-row md:justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">
                    Lista de Libros
                </h1>
                <div className="flex items-center space-x-4">
                    <input
                        type="text"
                        placeholder="Buscar por ID"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={() => navigate("/create")}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded shadow transition duration-300"
                    >
                        Crear Nuevo Libro
                    </button>
                </div>
            </div>

            {isLoading ? (
                renderSkeletons()
            ) : filteredBooks.length > 0 ? (
                <ul className="space-y-4">
                    {filteredBooks.map((book) => {
                        // Busca la cover photo asociada al libro, usando la propiedad "url" que trae la API
                        const cover = coverPhotos.find((cp) => cp.idBook === book.id);
                        const imageUrl = cover ? cover.url : "https://via.placeholder.com/150";
                        return (
                            <li
                                key={book.id}
                                className="bg-white shadow rounded p-6 transition transform hover:scale-105 duration-300"
                            >
                                <div className="flex flex-col md:flex-row md:items-center">
                                    {/* Imagen del libro */}
                                    <div className="w-full md:w-1/4 flex justify-center items-center mb-4 md:mb-0">
                                        <img
                                            src={imageUrl}
                                            alt={book.title}
                                            className="rounded shadow-md object-cover w-32 h-32"
                                        />
                                    </div>
                                    {/* Detalles del libro */}
                                    <div className="w-full md:w-3/4 md:pl-4">
                                        <h2 className="text-xl font-semibold text-gray-900">
                                            {book.title}
                                        </h2>
                                        <p className="text-gray-600 mt-2">{book.description}</p>
                                    </div>
                                </div>
                                {/* Acciones */}
                                <div className="mt-4 flex space-x-4">
                                    <Link
                                        to={`/detail/${book.id}`}
                                        className="bg-blue-100 text-blue-700 hover:bg-blue-200 px-3 py-1 rounded transition duration-300"
                                    >
                                        Ver Detalle
                                    </Link>
                                    <Link
                                        to={`/edit/${book.id}`}
                                        className="bg-green-100 text-green-700 hover:bg-green-200 px-3 py-1 rounded transition duration-300"
                                    >
                                        Editar
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(book.id!)}
                                        className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded transition duration-300"
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            ) : (
                <div className="text-center text-gray-600 mt-8">
                    No se encontraron libros.
                </div>
            )}

            {showModal && (
                <DeleteConfirmationModal
                    onConfirm={confirmDelete}
                    onCancel={() => setShowModal(false)}
                />
            )}
        </div>
    );
};

export default BookList;
