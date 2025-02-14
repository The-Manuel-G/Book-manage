// src/components/BookForm.tsx
import React, { useEffect, useState, FormEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createBook, getBookById, updateBook, Book } from "../services/api";

const BookForm: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const isEditMode = Boolean(id);

    const [book, setBook] = useState<Book>({
        title: "",
        description: "",
        pageCount: 1,
        excerpt: "",
        publishDate: new Date().toISOString().slice(0, 10),
    });

    useEffect(() => {
        if (isEditMode && id) {
            getBookById(parseInt(id))
                .then((data) =>
                    setBook({
                        ...data,
                        publishDate: new Date(data.publishDate)
                            .toISOString()
                            .slice(0, 10),
                    })
                )
                .catch((err) => console.error(err));
        }
    }, [id, isEditMode]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setBook((prev) => ({
            ...prev,
            [name]: name === "pageCount" ? parseInt(value) : value,
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            if (isEditMode && id) {
                await updateBook(parseInt(id), book);
                alert("Libro actualizado con exito");
            } else {
                await createBook(book);
                alert("Libro creado con exito");
            }
            navigate("/");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 p-6">
            <div className="w-full max-w-lg bg-white rounded-xl shadow-2xl overflow-hidden">
                <div className="bg-blue-500 px-6 py-4">
                    <h1 className="text-center text-white text-3xl font-semibold">
                        {isEditMode ? "Editar Libro" : "Crear Libro"}
                    </h1>
                </div>
                <form onSubmit={handleSubmit} className="px-8 py-6 space-y-5">
                    {/* Título */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Titulo
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={book.title}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-blue-300 focus:outline-none transition duration-200 shadow-sm"
                            required
                            maxLength={200}
                            placeholder="Ingrese el título del libro"
                        />
                    </div>

                    {/* Descripción */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Descripcion
                        </label>
                        <textarea
                            name="description"
                            value={book.description}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-blue-300 focus:outline-none transition duration-200 shadow-sm resize-none"
                            placeholder="Ingrese una descripción breve"
                        />
                    </div>

                    {/* Número de Páginas */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Numero de Paginas
                        </label>
                        <input
                            type="number"
                            name="pageCount"
                            value={book.pageCount}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-blue-300 focus:outline-none transition duration-200 shadow-sm"
                            min={1}
                            required
                            placeholder="Ingrese el número de páginas"
                        />
                    </div>

                    {/* Extracto */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Extracto
                        </label>
                        <textarea
                            name="excerpt"
                            value={book.excerpt}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-blue-300 focus:outline-none transition duration-200 shadow-sm resize-none"
                            placeholder="Ingrese un extracto del libro"
                        />
                    </div>

                    {/* Fecha de Publicación */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Fecha de Publicacion
                        </label>
                        <input
                            type="date"
                            name="publishDate"
                            value={book.publishDate}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-blue-300 focus:outline-none transition duration-200 shadow-sm"
                            required
                        />
                    </div>

                    {/* Botón */}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-300 active:scale-95"
                    >
                        {isEditMode ? "Actualizar" : "Crear"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default BookForm;
