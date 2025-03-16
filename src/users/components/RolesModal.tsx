import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPlusCircle, faTrashCan } from '@fortawesome/free-solid-svg-icons';

import { Modal } from './Modal';  // Asegúrate de importar el Modal genérico
import { RolItem } from './RolItem';
import useUserStore from '../store/useUserStore';
import { useUser } from '../hooks/useUser.ts';
import { InputForm } from '../../components/InputForm.tsx';
import { userRepository } from '../api/userApi.ts';
import { User } from '../../domain/types/User.ts';


interface Rol {
    rol: string;
}

interface RolesModalProps {
    user: User;
    isOpen: boolean;
    onClose: () => void;
}

export const RolesModal: React.FC<RolesModalProps> = ({ user, isOpen, onClose, }) => {
    const { register, handleSubmit, getValues, formState: { errors } } = useForm<Rol>();
    const [roles, setRoles] = useState([]);
    const [rolesByUser, setRolesByUser] = useState([]);
    const { handleAddRolUser, handleRemoveRolUser } = useUser();
    const { users } = useUserStore()

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const roles = await userRepository.getRoles()
                setRoles(roles)
            } catch (error) {
                console.error("Error fetching usuarios:", error);
            }
        };
        fetchRoles();
    }, [])

    useEffect(() => {

        const fetchRolesByUser = async () => {
            try {
                const roles = await userRepository.getRolesbyUser(user.id)
                setRolesByUser(roles)
            } catch (error) {
                console.error("Error fetching usuarios:", error);
            }
        };

        fetchRolesByUser();
    }, [users])

    const handleAddRol = async () => {
        const rol = getValues(); // Obtener todos los valores del formulario
        await handleAddRolUser(user.id, "", rol.rol)
    }
    // Función para obtener los usuarios

    const onSubmit = async (rol: Rol) => {
        // console.log(rol)
        // //await onUpdate(data.id, data);
        // //onClose();
    };

    const rolesOptions = roles.map(rol => {
        return { value: rol, label: rol }
    })

    return (
        <Modal title="Actualizar roles" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit(onSubmit)}>

            <div className='flex w-full justify-center items-center'>

                <div className='w-10/12'>
                    <InputForm label="Rol" name="rol" register={register} errors={errors.rol} type="select" floating={false} options={rolesOptions} />
                </div>

                <div className='w-2/12 flex justify-center align-middle items-center'>
                    <button
                        className="font-medium flex pt-6"
                        onClick={() => handleAddRol()}
                    >
                        <FontAwesomeIcon icon={faPlusCircle} className='fa-lg text-green-500 dark:text-green-500 ' />
                    </button>
                </div>

            </div>

            <h2 className='dark:text-dark_text text-primary-700'> Roles de usuario</h2>

            {
                rolesByUser.map(rol => (
                    <RolItem key={rol} rol={rol} userId={user.id} />
                ))
            }



        </Modal>
    );
};