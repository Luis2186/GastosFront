import { userRepository } from '../api/userApi';
import useUserStore from '../store/useUserStore';
import { errorDefault, isErrorMessage } from '../../utils/utils';
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

            const user = await userRepository.updateUser(idUser, userUpdate);

            onUpdateUser(user.id, user)
        } catch (error: unknown) {
            if (isErrorMessage(error)) {
                onError(error);
            } else {
                onError(errorDefault());
            }
        }
    }

    const handleGetAllUsers = async () => {
        try {
            onLoading();
            const users = await userRepository.getUsers();

            onGetAllUsers(users)

        } catch (error) {
            if (isErrorMessage(error)) {
                onError(error);
            } else {
                onError(errorDefault());
            }
        }
    }

    const handleGetUserById = async (userId: string) => {
        try {
            onLoading();
            const user = await userRepository.getUserById(userId);

        } catch (error) {
            if (isErrorMessage(error)) {
                onError(error);
            } else {
                onError(errorDefault());
            }
        }
    }

    const handleRemoveUser = async (userId: string) => {
        try {
            onLoading();
            const user = await userRepository.deleteUser(userId);
            onRemoveUser(userId)
        } catch (error) {
            if (isErrorMessage(error)) {
                onError(error);
            } else {
                onError(errorDefault());
            }
        }
    }

    const handleAddRolUser = async (idUsuario: string, idRol: string, nombreRol: string) => {
        try {
            if (!idUsuario && (!idRol && !nombreRol)) return
            onLoading();
            const response = await userRepository.addRol(idUsuario, "", nombreRol)

            onAddRolUser(idUsuario, nombreRol)
        } catch (error) {
            if (isErrorMessage(error)) {
                onError(error);
            } else {
                onError(errorDefault());
            }
        }
    }

    const handleRemoveRolUser = async (idUsuario: string, idRol: string, nombreRol: string) => {
        try {
            if (!idUsuario && (!idRol && !nombreRol)) return

            onLoading();

            const response = await userRepository.RemoveRol(idUsuario, "", nombreRol)

            onRemoveRolUser(idUsuario, nombreRol)

        } catch (error) {
            if (isErrorMessage(error)) {
                onError(error);
            } else {
                onError(errorDefault());
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
