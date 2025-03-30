import { userRepository } from '../api/userApi';
import useUserStore from '../store/useUserStore';
import { createErrorObject, handleError } from '../../../utils/utils';
import { User } from '../../../domain/types/User';
import { errorMessage } from '../../../types/input';
import { isErrorMessage } from '../../../utils/typeGuards';


export const useUser = () => {

    const { users, loading, errorMessage, onLoading, onError, onGetAllUsers, onRemoveUser, onUpdateUser,
        onRemoveRolUser, onAddRolUser
    } = useUserStore();


    const handleUpdate = async (idUser: string, userUpdate: User) => {
        try {
            onLoading();
            if (userUpdate.active === false) userUpdate.active = false;
            if (userUpdate.active === true) userUpdate.active = true;

            const user: User | errorMessage = await userRepository.update(idUser, userUpdate);

            if (user && !isErrorMessage(user)) onUpdateUser(user.id, user)

            return user;

        } catch (error: unknown) {
            return handleError(error)
        }
    }

    const handleGetAllUsers = async () => {
        try {
            onLoading();
            const users: User[] | errorMessage = await userRepository.getAll();

            if (users && !isErrorMessage(users)) onGetAllUsers(users)

        } catch (error) {
            return handleError(error)
        }
    }

    const handleGetUserById = async (userId: string) => {
        try {
            onLoading();
            return await userRepository.getById(userId);

        } catch (error) {
            return handleError(error)
        }
    }

    const handleRemoveUser = async (userId: string) => {
        try {
            onLoading();
            await userRepository.delete(userId);
            onRemoveUser(userId)
        } catch (error) {
            return handleError(error)
        }
    }

    const handleAddRolUser = async (idUsuario: string, idRol: string, nombreRol: string) => {
        try {
            if (!idUsuario && (!idRol && !nombreRol)) return
            onLoading();

            await userRepository.addRol(idUsuario, "", nombreRol)
            onAddRolUser(idUsuario, nombreRol)

        } catch (error) {
            return handleError(error)
        }
    }

    const handleRemoveRolUser = async (idUsuario: string, idRol: string, nombreRol: string) => {
        try {
            if (!idUsuario && (!idRol && !nombreRol)) return

            onLoading();

            await userRepository.RemoveRol(idUsuario, "", nombreRol)
            onRemoveRolUser(idUsuario, nombreRol)

        } catch (error) {
            return handleError(error)
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
