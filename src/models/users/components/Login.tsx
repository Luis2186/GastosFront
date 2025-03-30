import { useState } from 'react';
import useAuthStore from '../store/useAuthStore.ts';
import { useAuth } from '../hooks/useAuth.ts';
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import { schemaLogin } from '../validation/userValidationSchema.ts';
import { useNavigate } from 'react-router-dom';

interface IFormInput {
    email: string;
    password: string;
}

export const Login = () => {
    const { handleLogin } = useAuth();
    const [remember, setRemember] = useState(false);
    const { user, errorMessage } = useAuthStore();
    const navigate = useNavigate();

    // Usa useForm con tipos explícitos
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>({
        resolver: zodResolver(schemaLogin),  // Usamos el resolver de Zod con el esquema importado
    });

    // Función que maneja el envío del formulario
    const onSubmit = async (data: IFormInput) => {

        await handleLogin(data.email, data.password)
        if (user) {
            navigate("/")
        }
    };

    return (
        <div className="flex w-full h-[calc(100vh-72px)] justify-center items-center">
            <div className="h-3/5  w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-indigo-950 dark:border-white-700">
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <h5 className="text-xl font-medium text-gray-900 dark:text-white">
                        Ingresa a nuestra plataforma
                    </h5>

                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Correo
                        </label>
                        <input
                            type="email"
                            id="email"
                            value="l.lopezperdomo.e@gmail.com"
                            //value="juan@hotmail.com"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-indigo-600 dark:border-gray-500 dark:placeholder-indigo-100 dark:text-white"
                            placeholder="nombre@compania.com"
                            {...register('email')}
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email.message}</p>}
                    </div>

                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            id="password"
                            placeholder="••••••••"
                            //autoComplete="current-password"
                            value="Admin_123456!"
                            //value="Tanko_123456"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-indigo-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            {...register("password")}
                        />
                        {errors.password && <p className="text-red-500 text-sm mt-2">{errors.password.message}</p>}
                    </div>

                    <div className="flex items-start">
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input
                                    id="remember"
                                    type="checkbox"
                                    value=""
                                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                                    checked={remember}
                                    onChange={() => setRemember(!remember)}
                                />
                            </div>
                            <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                Recordarme
                            </label>
                        </div>
                        <a href="#" className="ms-auto text-sm text-blue-700 hover:underline dark:text-blue-500">
                            Se te olvido el Password?
                        </a>
                    </div>

                    <button
                        type="submit"
                        className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Ingresar
                    </button>

                    <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                        Aun no tienes cuenta?{' '}
                        <a href="/Register" className="text-blue-700 hover:underline dark:text-blue-500">
                            ¡Create una!
                        </a>
                    </div>
                </form>
                {errorMessage && errorMessage.errors &&
                    errorMessage.errors.map((element: { description: string }, index: number) => (
                        <p key={index} className='py-5 text-red-400'>{element.description}</p>
                    ))}
            </div>
        </div>
    );
};

export default Login;