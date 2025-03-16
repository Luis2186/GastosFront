import { useEffect } from 'react';
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import { schemaRegister } from '../validation/userValidationSchema';
import { useAuth } from '../hooks/useAuth';
import Datepicker from './DatePicker';
import { InputForm } from '../../components/InputForm';

interface IFormInput {
    userName: string;
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
    phone: string;
    bornDate: string | '';
}

const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const [month, day, year] = dateString.split("/"); // Dividir por "/"

    return `${year}-${month}-${day}`; // Reordenar en formato "aaaa-mm-dd"
};

const classNameLabel = 'peer-focus:font-medium absolute text-lg text-white dark:text-blue-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-primary-200 peer-focus:dark:text-primary-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6';
const classNameInput = 'block py-2.5 px-0 w-full text-md text-primary-200 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-primary-600 peer';
const classNameContainer = 'relative z-0 w-full mb-5 group';


const Register = () => {
    const { handleRegister, errorMessage, clearErrorMessage } = useAuth();

    // Usa useForm con tipos explícitos
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>({
        resolver: zodResolver(schemaRegister),  // Usamos el resolver de Zod con el esquema importado
    });


    useEffect(() => {
        clearErrorMessage();
    }, [])


    // Función que maneja el envío del formulario
    const onSubmit = async (data: IFormInput) => {
        const userRegister: any = {
            userName: data.userName,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: data.phone,
            dateOfBirth: formatDate(data.bornDate),
            password: data.password,
            passwordConfirmation: data.confirmPassword,
            role: "Usuario"
        }

        // export type UserRegister = {
        //     userName: string,
        //     firstName: string,
        //     lastName: string,
        //     email: string,
        //     phone: string,
        //     dateOfBirth: Date,
        //     password: string,
        //     passwordConfirmation: string,
        //     role: string,
        // }
        await handleRegister(userRegister);
    };

    return (
        <div className="flex w-full h-[calc(100vh-72px)] justify-center items-center gap-5 ">

            <div className="h-4/5 w-full max-w-sm p-4 border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-indigo-950 dark:border-white-700 bg-indigo-950 bg-opacity-40">


                <div className="w-full h-full flex flex-col justify-center items-center">
                    <h3 className='text-4xl pb-10'>Facilita tus finanzas</h3>
                    <img
                        src="https://flowbite.com/docs/images/logo.svg"
                        className="h-48"
                        alt="Flowbite Logo"
                    />
                </div>
            </div>

            <div className="h-4/5 w-full max-w-xl p-4  border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-indigo-950 dark:border-white-700 bg-indigo-950 bg-opacity-40">
                <form className="max-w-md mx-auto flex flex-col justify-between h-full" onSubmit={handleSubmit(onSubmit)}>

                    <InputForm type="text" name='userName' label='Nombre de usuario' errors={errors.userName} register={register} floating
                        classNameContainer={classNameContainer} classNameInput={classNameInput} classNameLabel={classNameLabel} />
                    <InputForm type="email" name='email' label='Correo' errors={errors.email} register={register} floating
                        classNameContainer={classNameContainer} classNameInput={classNameInput} classNameLabel={classNameLabel} />
                    <InputForm type="password" name='password' label='Contraseña' register={register} errors={errors.password} floating
                        classNameContainer={classNameContainer} classNameInput={classNameInput} classNameLabel={classNameLabel} />
                    <InputForm type="password" name='confirmPassword' label='Confirmar contraseña' register={register} errors={errors.confirmPassword} floating
                        classNameContainer={classNameContainer} classNameInput={classNameInput} classNameLabel={classNameLabel} />

                    <div className="grid md:grid-cols-2 md:gap-6">
                        <InputForm type="text" name='firstName' label='Nombres' register={register} errors={errors.firstName} floating
                            classNameContainer={classNameContainer} classNameInput={classNameInput} classNameLabel={classNameLabel} />
                        <InputForm type="text" name='lastName' label='Apellidos' register={register} errors={errors.lastName} floating
                            classNameContainer={classNameContainer} classNameInput={classNameInput} classNameLabel={classNameLabel} />
                    </div>

                    <div className="grid md:grid-cols-2 md:gap-6">
                        <InputForm type="tel" name='phone' label='Teléfono' pattern="[0-9]{3}-[0-9]{3}-[0-9]{3}" register={register} errors={errors.phone} floating
                            classNameContainer={classNameContainer} classNameInput={classNameInput} classNameLabel={classNameLabel} />
                        <Datepicker register={register} error={errors.bornDate ? { message: errors.bornDate.message || '' } : undefined} />
                    </div>

                    <div className="grid md:grid-cols-1 md:gap-6 text-red-400">
                        {errorMessage && errorMessage.errors &&
                            <p> Error al registrar </p>
                            &&
                            errorMessage.errors.map((element: { code: string, description: string }, index: number) => (
                                <p key={index}>{element.description}</p>
                            ))
                        }
                    </div>

                    <button type="submit" className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-md w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800 mt-auto">
                        Registrarme
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;