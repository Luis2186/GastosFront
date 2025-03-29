// import { Group } from "../domain/types/Group";
import { errorMessage } from "../types/input";

// // Type Guard para verificar si la respuesta es de tipo Group
// function isGroup(response: any): response is Group {
//     return response && typeof response.id === 'string' && typeof response.name === 'string';
// }

// Type Guard para verificar si la respuesta es de tipo errorMessage
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
