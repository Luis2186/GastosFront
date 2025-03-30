// src/hooks/useAuth.js
import { User, UserRegister } from '../../../domain/types/User';
import { errorMessage } from '../../../types/input';
import { isErrorMessage } from '../../../utils/typeGuards';
import { handleError } from '../../../utils/utils';
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

            const usuario: User | errorMessage = await userRepository.getById(response.id);

            if (usuario && !isErrorMessage(usuario)) onLogin(usuario); // Guarda el usuario y el token en el estado global

        } catch (error) {
            console.error('Credenciales inválidas', error);
            return handleError(error)
        }
    };

    const handleLogout = async () => {
        try {
            await userRepository.logout();
            onLogout();
            window.location.href = '/LoginPage';

        } catch (error) {
            console.error('Credenciales inválidas', error);
            return handleError(error)

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

        } catch (error) {
            return handleError(error)

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