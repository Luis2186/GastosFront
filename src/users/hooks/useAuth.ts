// src/hooks/useAuth.js
import { User, UserRegister } from '../../domain/types/User';
import { createErrorObject, isErrorMessage } from '../../utils/utils';
import { LoginResult } from '../api/types/userResult';
import { userRepository } from '../api/userApi';
import useAuthStore from '../store/useAuthStore';
import useUserStore from '../store/useUserStore';

export const useAuth = () => {
    const { onLogin, onChecking, onLogout, user, isAuthenticated, errorMessage, clearErrorMessage } = useAuthStore();
    const { onLoading, onRegister } = useUserStore();

    // Función para manejar el login
    const handleLogin = async (email: string, password: string) => {
        try {

            // Inicia el estado de autenticación en "checking"
            onChecking();

            // Llama a la API para hacer login
            const response: LoginResult = await userRepository.login(email, password);

            const usuario: User | null = await userRepository.getById(response.id);

            onLogin(usuario); // Guarda el usuario y el token en el estado global

        } catch (err: unknown) {
            if (isErrorMessage(err)) {
                onLogout(err);
            } else {
                onLogout(createErrorObject());
            }
            console.error('Credenciales inválidas', err);
        }
    };

    const handleLogout = async () => {
        try {
            await userRepository.logout();
            onLogout();
            window.location.href = '/LoginPage';

        } catch (err) {
            if (isErrorMessage(err)) {
                onLogout(err);
            } else {
                onLogout(createErrorObject());
            }
            console.error('Credenciales inválidas', err);
        }
    };

    // Función para manejar el registro
    const handleRegister = async (user: UserRegister) => {
        try {
            onLoading()

            const userMap = await userRepository.register(user);

            if (userMap == null) return

            onLogin(userMap);

            onRegister(userMap)

            //localStorage.setItem('token', userMap.token); // Guarda el token en el localStorage

            //window.location.href = '/'; // Redirigir al home después de registro

        } catch (err) {
            console.log(err)
            if (isErrorMessage(err)) {
                onLogout(err);
            } else {
                onLogout(createErrorObject());
            }

        } finally {

        }
    };


    return {
        user,
        isAuthenticated,
        errorMessage,
        handleLogin,
        handleLogout,
        handleRegister,
        clearErrorMessage,
    };
};