export interface Props {
    type: string;      // Tipo del input (e.g., 'text', 'password', 'email')
    name: string;      // Nombre del campo input
    id: string;        // ID del input (útil para accesibilidad y selección)
    placeholder?: string; // Texto placeholder para el input
    label: string;     // Texto que sirve como etiqueta del input
    required?: boolean;  // Propiedad opcional para hacer el campo requerido o no
    pattern?: string;
    register: any;
    validation?: object;
    error?: any;  // Errores de validación
}

export interface errorMessage {
    title: string,
    status: number,
    detail: string,
    instance: string,
    errors: errorDetail[]
}


export interface errorDetail {
    code: string,
    description: string
}