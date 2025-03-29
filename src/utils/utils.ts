import { errorMessage } from "../types/input";
import axios from 'axios';

// Función para verificar si el error tiene la forma de errorMessage
export const isErrorMessage = (error: unknown): error is errorMessage => {
    return (
        typeof error === 'object' &&
        error !== null &&
        'title' in error &&
        'status' in error &&
        'detail' in error &&
        'instance' in error &&
        'errors' in error &&
        Array.isArray((error as errorMessage).errors) &&
        typeof (error as errorMessage).title === 'string' &&
        typeof (error as errorMessage).status === 'number' &&
        typeof (error as errorMessage).detail === 'string' &&
        typeof (error as errorMessage).instance === 'string'
    );
};

// Manejo de errores
export function handleError(error: unknown): errorMessage {
    if (axios.isAxiosError(error)) {
        const errorMsg = error.response?.data?.message || error.message || 'Error desconocido';
        return createErrorObject(500, errorMsg);
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