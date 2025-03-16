import { useForm } from "react-hook-form";

import { useState } from "react";
import { InputForm } from "../../components/InputForm";
import { createGroup } from "../api/types/GroupResult";



export const GroupCreate = () => {
    // Usa useForm con tipos explícitos
    const { register, handleSubmit, formState: { errors } } = useForm<createGroup>({
        // resolver: zodResolver(schemaRegister),  // Usamos el resolver de Zod con el esquema importado
    });

    const [checkedValue, setCheckedValue] = useState(false);


    // Función para manejar el cambio de estado del checkbox
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCheckedValue(event.target.checked); // Actualizamos el estado con el nuevo valor
    };

    // Función que maneja el envío del formulario
    const onSubmit = async () => {
        // const userRegister = {
        //     nombreDeUsuario: data.userName,
        //     nombre: data.firstName,
        //     apellido: data.lastName,
        //     email: data.email,
        //     telefono: data.phone,
        //     fechaDeNacimiento: formatDate(data.bornDate),
        //     password: data.password,
        //     confirmacionPassword: data.confirmPassword,
        //     rol: "Usuario"
        // }
        // console.log(userRegister)
        // await handleRegister(userRegister);
    };


    return (
        <div className="w-full justify-center">
            <h2
                className="text-light_main dark:text-dark_title text-3xl tracking-wide w-full flex justify-center h-10"
            >
                Crear grupo
            </h2>

            <div className="h-2/4 w-3/6 mx-auto my-10 p-4 border border-light_active rounded-lg shadow sm:p-6 md:p-8 bg-primary-50 bg-opacity-40 
              dark:bg-gradient-to-br from-primary-800 to-primary-950 dark:border-white-700">
                <form className="max-w-md mx-auto flex flex-col justify-between h-full gap-5" onSubmit={handleSubmit(onSubmit)}>

                    <div className="flex gap-2 items-center">
                        <label htmlFor={"codigo"} className={"block text-sm font-medium text-primary-700 dark:text-dark_text"}>
                            Codigo
                        </label>
                        <input
                            id="codigo"
                            type="checkbox"
                            checked={checkedValue} // Usamos el valor del estado para controlar el checkbox
                            onChange={handleChange} // Llamamos a handleChange cuando cambia el estado del checkbox
                            className="h-5 w-5 rounded-full " // Clase de Tailwind o cualquier clase personalizada
                        />
                    </div>

                    {
                        !checkedValue ? <>
                            <InputForm type="text" name='nombre' label='Nombre grupo' register={register} errors={errors.nombre} />
                            <InputForm type="text" name='descripcion' label='Descripcion' errors={errors.descripcion} register={register} />
                        </>
                            :
                            <InputForm type="text" name='codigoAcceso' label='Codigo de accesso' register={register} errors={errors.codigoAcceso} />

                    }
                    <div className="rounded-full bg-dark_text_menu"></div>
                    {/* 
                    <div className="grid md:grid-cols-1 md:gap-6 text-red-400">
                        {errorMessage && errorMessage.errors &&
                            <p> Error al registrar </p>
                            &&
                            errorMessage.errors.map((element: { code: string, description: string }, index: number) => (
                                <p key={index}>{element.description}</p>
                            ))
                        }
                    </div> */}

                    <button type="submit" className="text-white bg-dark_text_menu hover:bg-light_text_menu focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-md w-full sm:w-2/4 m-auto px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 mt-auto">
                        {!checkedValue ? "Crear" : "Unirse"}
                    </button>
                </form>
            </div>

        </div>



    )
}
