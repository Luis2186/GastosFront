import { userRepository } from '../api/userApi';
import useUserStore from '../store/useUserStore';
import { createErrorObject, isErrorMessage } from '../../utils/utils';
import { User } from '../../domain/types/User';


export const useUser = () => {

    const { users, loading, errorMessage, onLoading, onError, onGetAllUsers, onRemoveUser, onUpdateUser,
        onRemoveRolUser, onAddRolUser
    } = useUserStore();


    const handleUpdate = async (idUser: string, userUpdate: User) => {
        try {
            onLoading();
            if (userUpdate.active === false) userUpdate.active = false;
            if (userUpdate.active === true) userUpdate.active = true;

            const user = await userRepository.update(idUser, userUpdate);
            if (user) onUpdateUser(user.id, user)

        } catch (error: unknown) {
            if (isErrorMessage(error)) {
                onError(error);
            } else {
                createErrorObject(500, 'Error inesperado, por favor intente nuevamente.');
            }
        }
    }

    const handleGetAllUsers = async () => {
        try {
            onLoading();
            const users: User[] | null = await userRepository.getAll();

            if (users) onGetAllUsers(users)

        } catch (error) {
            if (isErrorMessage(error)) {
                onError(error);
            } else {
                createErrorObject(500, 'Error inesperado, por favor intente nuevamente.');
            }
        }
    }

    const handleGetUserById = async (userId: string) => {
        try {
            onLoading();
            return await userRepository.getById(userId);

        } catch (error) {
            if (isErrorMessage(error)) {
                onError(error);
            } else {
                createErrorObject(500, 'Error inesperado, por favor intente nuevamente.');
            }
        }
    }

    const handleRemoveUser = async (userId: string) => {
        try {
            onLoading();
            await userRepository.delete(userId);
            onRemoveUser(userId)
        } catch (error) {
            if (isErrorMessage(error)) {
                onError(error);
            } else {
                createErrorObject(500, 'Error inesperado, por favor intente nuevamente.');
            }
        }
    }

    const handleAddRolUser = async (idUsuario: string, idRol: string, nombreRol: string) => {
        try {
            if (!idUsuario && (!idRol && !nombreRol)) return
            onLoading();

            await userRepository.addRol(idUsuario, "", nombreRol)
            onAddRolUser(idUsuario, nombreRol)

        } catch (error) {
            if (isErrorMessage(error)) {
                onError(error);
            } else {
                createErrorObject(500, 'Error inesperado, por favor intente nuevamente.');
            }
        }
    }

    const handleRemoveRolUser = async (idUsuario: string, idRol: string, nombreRol: string) => {
        try {
            if (!idUsuario && (!idRol && !nombreRol)) return

            onLoading();

            await userRepository.RemoveRol(idUsuario, "", nombreRol)
            onRemoveRolUser(idUsuario, nombreRol)

        } catch (error) {
            if (isErrorMessage(error)) {
                onError(error);
            } else {
                createErrorObject(500, 'Error inesperado, por favor intente nuevamente.');
            }
        }
    }


    return {
        users,
        loading,
        errorMessage,
        handleUpdate,
        handleGetAllUsers,
        handleRemoveUser,
        handleAddRolUser,
        handleRemoveRolUser
    };
}
