import React, { useState, useMemo, JSX } from 'react';

interface Column {
    name: string; // El nombre de la columna
    render?: (row: any) => JSX.Element | string; // Renderizado personalizado para cada celda
    headerAction?: JSX.Element; // Icono o acción específica en el encabezado de la columna
}

interface TableProps {
    columns: Column[]; // Cambiar para que cada columna pueda ser un objeto con configuración personalizada
    data: any[]; // Los datos de la tabla
    onActionClick?: (action: string, row: any) => void; // Callback para acciones
    actionButtons?: string[]; // Botones de acción global
}

export const GenericTable1: React.FC<TableProps> = ({ columns, data, onActionClick, actionButtons }) => {
    const [searchTerm, setSearchTerm] = useState('');

    // Filtrar los datos en función del término de búsqueda
    const filteredData = useMemo(() => {
        return data.filter((row) =>
            columns.some((col) => row[col.name]?.toString().toLowerCase().includes(searchTerm.toLowerCase()))
        );
    }, [data, columns, searchTerm]);

    return (
        <>
            {/* Buscador */}
            <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-gradient rounded-t-2xl">
                <div className="px-5">
                    <button
                        onClick={() => { }}
                        className="inline-flex items-center text-light_text bg-white border border-primary-300 focus:outline-none hover:bg-primary-100 focus:ring-4 focus:ring-primary-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-primary-800 dark:text-dark_text dark:border-primary-600 dark:hover:bg-primary-700 dark:hover:border-primary-600 dark:focus:ring-primary-700"
                        type="button"
                    >
                        Action
                        <svg
                            className="w-2.5 h-2.5 ms-2.5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 10 6"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m1 1 4 4 4-4"
                            ></path>
                        </svg>
                    </button>
                </div>

                <div className="relative px-5">
                    <input
                        type="text"
                        id="table-search-usuarios"
                        className="block pt-2 ps-10 text-sm text-light_text border border-primary-300 rounded-lg w-80 bg-primary-50 focus:ring-blue-500 focus:border-primary-500 dark:bg-primary-700 dark:border-primary-600 dark:placeholder-primary-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Buscar"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Tabla */}
            <table className="w-full text-sm text-left rtl:text-right text-light_text dark:text-dark_text">
                <thead className="text-xs text-light_text uppercase bg-gradient-to-b from-[var(--color-primary-200)] to-[var(--color-primary-300)] dark:bg-gradient-to-br dark:from-primary-800 dark:to-primary-950 dark:text-dark_text rounded-full">
                    <tr>
                        {columns.map((col, index) => (
                            <th key={index} scope="col" className="px-6 py-3">
                                <div className="flex items-center justify-between">
                                    {col.name}
                                    {/* Si existe un icono de acción en el encabezado, lo mostramos */}
                                    {col.headerAction && (
                                        <span className="ml-2 cursor-pointer">
                                            {col.headerAction}
                                        </span>
                                    )}
                                </div>
                            </th>
                        ))}
                        {actionButtons && <th className="px-6 py-3">Acciones</th>}
                    </tr>
                </thead>
                <tbody>
                    {filteredData.length === 0 ? (
                        <tr>
                            <td colSpan={columns.length + (actionButtons ? 1 : 0)} className="text-center py-4 text-gray-500">
                                No hay datos disponibles.
                            </td>
                        </tr>
                    ) : (
                        filteredData.map((row, rowIndex) => (
                            <tr key={rowIndex} className="bg-primary-50 border-b dark:bg-primary-950 dark:border-primary-700 hover:bg-gray-50 dark:hover:bg-primary-700 text-light_text dark:text-dark_text">
                                {columns.map((col, colIndex) => (
                                    <td key={colIndex} className="px-6 py-4">
                                        {col.render ? col.render(row) : row[col.name]} {/* Si tiene renderizado personalizado */}
                                    </td>
                                ))}
                                {actionButtons && (
                                    <td className="px-2 py-4 flex space-x-2">
                                        {actionButtons.includes("edit") && (
                                            <button
                                                onClick={() => onActionClick?.('edit', row)} // Acción de editar
                                                className="font-medium text-light_text dark:text-dark_text hover:underline"
                                            >
                                                Editar
                                            </button>
                                        )}
                                        {actionButtons.includes("delete") && (
                                            <button
                                                onClick={() => onActionClick?.('delete', row)} // Acción de eliminar
                                                className="font-medium text-red-600 dark:text-red-500 hover:underline"
                                            >
                                                Eliminar
                                            </button>
                                        )}
                                    </td>
                                )}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </>
    );
};