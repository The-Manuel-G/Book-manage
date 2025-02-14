// src/components/DeleteConfirmationModal.tsx
import React from "react";

interface Props {
    onConfirm: () => void;
    onCancel: () => void;
}

const DeleteConfirmationModal: React.FC<Props> = ({ onConfirm, onCancel }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-md">
                <h2 className="text-xl font-bold mb-4">Confirmar Eliminación</h2>
                <p className="mb-4">
                    ¿Estás seguro de que deseas eliminar este libro?
                </p>
                <div className="flex justify-end">
                    <button
                        onClick={onCancel}
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={onConfirm}
                        className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmationModal;
