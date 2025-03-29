import { useState } from "react";

type DropdownSearchProps<T> = {
    items: T[]; // Lista de elementos a mostrar en el dropdown
    label: string; // Etiqueta del campo de búsqueda
    keyExtractor: (item: T) => string; // Función para extraer una clave única de cada item (por ejemplo, id o nombre)
    onSelect?: (item: T) => void; // Función que se ejecutará al seleccionar un item
    placeholder?: string; // Placeholder del input
    searchKey?: (item: T) => string; // Función para extraer la clave por la cual filtrar
};

export function DropdownSearch<T>({
    items,
    label,
    keyExtractor,
    onSelect,
    placeholder = "Search...",
    searchKey = (item) => String(item),
}: DropdownSearchProps<T>) {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedItem, setSelectedItem] = useState<T | null>(null); // Guarda el ítem seleccionado
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Filtrar los items en función de la búsqueda
    const filteredItems = items.filter(item =>
        searchKey(item).toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSelect = (item: T) => {
        setSelectedItem(item); // Marcar el ítem seleccionado
        if (onSelect) onSelect(item); // Llamar a la función onSelect
        setIsDropdownOpen(false); // Cerrar el dropdown al seleccionar
    };

    return (
        <>
            <button
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)} // Alternar la visibilidad del dropdown
            >
                {selectedItem ? searchKey(selectedItem) : label}
                <svg
                    className="w-2.5 h-2.5 ms-3"
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
                    />
                </svg>
            </button>

            {isDropdownOpen && (
                <div
                    className="z-10 bg-white rounded-lg shadow-sm w-60 dark:bg-gray-700"
                    style={{ maxHeight: "250px", overflowY: "auto" }}
                >
                    <div className="p-3">
                        <label htmlFor="input-group-search" className="sr-only">
                            {label}
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg
                                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                    />
                                </svg>
                            </div>
                            <input
                                type="text"
                                id="input-group-search"
                                className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder={placeholder}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                    <ul className="px-3 pb-3 text-sm text-gray-700 dark:text-gray-200">
                        {filteredItems.length > 0 ? (
                            filteredItems.map((item) => (
                                <li key={keyExtractor(item)}>
                                    <div className="flex items-center ps-2 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-600">
                                        <input
                                            id={`checkbox-item-${keyExtractor(item)}`}
                                            type="checkbox"
                                            checked={selectedItem === item} // Verifica si el ítem está seleccionado
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                            onChange={() => handleSelect(item)} // Selecciona el ítem al hacer clic
                                        />
                                        <label
                                            htmlFor={`checkbox-item-${keyExtractor(item)}`}
                                            className="w-full py-2 ms-2 text-sm font-medium text-gray-900 rounded-sm dark:text-gray-300"
                                        >
                                            {searchKey(item)}
                                        </label>
                                    </div>
                                </li>
                            ))
                        ) : (
                            <li>No results found</li>
                        )}
                    </ul>
                </div>
            )}
        </>
    );
}

