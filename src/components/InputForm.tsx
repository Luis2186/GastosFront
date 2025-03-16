import type { FieldValues, UseFormRegister, FieldError, Path } from 'react-hook-form';

interface Option {
    value: string;
    label: string;
}

interface InputFormProps<T extends FieldValues> {
    label: string;
    name: Path<T>;
    type: string;
    register: UseFormRegister<T>;
    errors: FieldError | undefined;
    options?: Option[]; // Solo para campos select
    placeholder?: string | undefined; // Placeholder para los campos de texto
    maxLength?: number; // Para campos de texto con límite de caracteres
    pattern?: string,
    checkedValue?: string | boolean; // Para manejar valores checked en checkbox y radio
    classNameInput?: string | undefined;
    classNameLabel?: string | undefined;
    classNameContainer?: string | "";
    floating?: boolean
}

export const InputForm = <T extends FieldValues>({
    label,
    classNameInput = 'mt-1 p-2 block w-full border border-primary-700 rounded-md focus:ring-primary-500 focus:border-primary-500 dark:bg-primary-600 dark:text-dark_text ',
    classNameLabel = 'block text-sm font-medium text-primary-700 dark:text-dark_text ',
    classNameContainer = '',
    name,
    type,
    register,
    errors,
    options,
    placeholder = "",
    pattern,
    maxLength,
    checkedValue,
    floating = false
}: InputFormProps<T>) => {

    return (
        <div className={classNameContainer}>

            {!floating &&
                <label htmlFor={name} className={classNameLabel}>
                    {label}
                </label>
            }

            {/* Campo select */}
            {type === 'select' ? (
                <select
                    id={name}
                    {...register(name)}
                    className={classNameInput}
                >
                    {options?.map((option, index) => (
                        <option key={index} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            ) :
                // Campo checkbox o radio
                type === 'checkbox' || type === 'radio' ? (
                    <input
                        id={name}
                        type={type}
                        {...register(name)}
                        value={checkedValue?.toString()}
                        className={classNameInput}
                        checked={checkedValue ? true : false} // Asegura que se marca si checkedValue es verdadero
                    />
                ) :
                    // Campo input general
                    (
                        <input
                            id={name}
                            type={type}
                            pattern={pattern}
                            {...register(name, { maxLength })}
                            placeholder={placeholder}
                            className={classNameInput}
                        />
                    )}

            {floating &&
                <label htmlFor="floating_email" className={classNameLabel}>
                    {label}
                </label>
            }
            {errors && <p className="text-red-500 text-xs">{errors.message}</p>}
        </div>
    );
};