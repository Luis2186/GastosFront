import { errorMessage } from "../types/input";
import { AxiosError } from 'axios';

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

export const errorDefault = (detail?: string) => {
    return {
        title: 'Error inesperado',
        status: 500,
        detail: detail ? detail : 'Ocurrió un error inesperado, por favor intente nuevamente.',
        instance: '',
        errors: [],
    };
}

// Definir un guard para verificar si es un error de Axios
function isAxiosError(error: unknown): error is AxiosError {
    return (error as any).response !== undefined;
}
