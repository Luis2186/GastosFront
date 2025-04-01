import { errorMessage } from "../types/input";
import axios from 'axios';



type error = {
    code: string,
    description: string
}

export function handleError(error: unknown): errorMessage {
    if (axios.isAxiosError(error)) {
        const status = error.response?.status || 500;
        const errors = error.response?.data?.errors || [];
        const errorMsg = error.response?.data?.message || error.message || 'Error desconocido';
        const instance = error.config?.url || 'Instancia desconocida'; // Capture the URL or instance
        return createErrorObject(status, errorMsg, instance, errors);
    }

    const errorMsg = error instanceof Error ? error.message : 'Error inesperado, por favor intente nuevamente.';
    return createErrorObject(500, errorMsg, 'Instancia desconocida');
}


export function createErrorObject(status?: number, detail?: string, instance?: string, errors?: error[]): errorMessage {
    return {
        title: 'Error inesperado',
        status: status || 500,
        detail: detail || 'Error inesperado, por favor intente nuevamente.',
        instance: instance || 'Instancia desconocida',
        errors: errors || [],
    };
}