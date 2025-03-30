import { errorMessage } from "../types/input";
import axios from 'axios';


// Manejo de errores
export function handleError(error: unknown): errorMessage {
    if (axios.isAxiosError(error)) {
        const errorMsg = error.response?.data?.message || error.message || 'Error desconocido';
        return createErrorObject(error.status, errorMsg);
    }

    return createErrorObject(500, 'Error inesperado, por favor intente nuevamente.');
}

// Crea un objeto de error estandarizado
export function createErrorObject(status?: number, detail?: string): errorMessage {
    return {
        title: 'Error inesperado',
        status: status ? status : 500,
        detail: detail ? detail : 'Error inesperado, por favor intente nuevamente.',
        instance: '',
        errors: [],
    };
}