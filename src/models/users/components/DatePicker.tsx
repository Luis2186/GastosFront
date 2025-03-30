
import React, { useEffect, useState } from 'react';

// Definir los tipos de las props que recibes
interface DatepickerProps {
    register: any; // El tipo de register dependerá de tu librería (como react-hook-form)
    error?: { message: string | undefined }; // Definir tipo para el error si lo hay
}

const Datepicker: React.FC<DatepickerProps> = ({ register, error }) => {
    const [isClient, setIsClient] = useState(false);

    // El código solo se ejecuta en el cliente
    useEffect(() => {
        setIsClient(true); // Indica que el componente se ha montado en el cliente
    }, []);

    useEffect(() => {
        if (isClient) {
            // Inicializamos Flowbite solo en el cliente
            const datepicker = document.getElementById('datepicker-autohide');
            if (datepicker && window.Datepicker) {
                // Inicializa Flowbite Datepicker
                new window.Datepicker(datepicker, {
                    autohide: true,
                });
            }
        }
    }, [isClient]); // Solo se ejecuta cuando isClient es true

    return (
        isClient && ( // Renderiza el componente solo en el cliente
            <div className="relative z-0 w-full mb-5 group">
                <div className="h-11 absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg
                        className="w-4 h-4 text-primary-200 dark:primary-200"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                    </svg>
                </div>
                <input
                    id="datepicker-autohide"
                    name="bornDate"
                    datepicker="true"
                    datepicker-autohide="true"
                    type="text"
                    className="bg-primary-50 border h-auto border-primary-300 text-primary-900 text-md rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full ps-10 p-2.5 dark:bg-indigo-700 dark:border-primary-600 dark:placeholder-primary-200 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Fecha de nacimiento"
                    {...register("bornDate")}
                />
                {error && <p className="text-red-500 text-sm mt-2">{error.message}</p>}
            </div>
        )
    );
};

export default Datepicker;