import React from 'react';
import { useForm } from 'react-hook-form';
import { Modal } from './Modal';  // Asegúrate de importar el Modal genérico
import { InputForm } from '../../components/InputForm';
import { User } from '../../domain/types/User';

interface UserModalProps {
    user: User;
    isOpen: boolean;
    onClose: () => void;
    onUpdate: (userId: string, user: User) => void;
}

export const UserModal: React.FC<UserModalProps> = ({ user, isOpen, onClose, onUpdate }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<User>({
        defaultValues: user,
    });

    const onSubmit = async (data: User) => {
        await onUpdate(data.id, data);
        onClose();
    };

    return (
        <Modal title="Actualizar Usuario" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit(onSubmit)}>
            <InputForm label="Nombre" name="name" register={register} errors={errors.name} type="text" floating={false} />
            <InputForm label="Apellido" name="lastName" register={register} errors={errors.lastName} type="text" floating={false} />
            <InputForm label="Edad" name="age" register={register} errors={errors.age} type="text" floating={false} />
            <InputForm label="Nombre de usuario" name="userName" register={register} errors={errors.userName} type="text" floating={false} />
            <InputForm label="Fecha de nacimiento" name="dateOfBirth" register={register} errors={errors.dateOfBirth} type="date" floating={false} />
            <InputForm label="Teléfono" name="phone" register={register} errors={errors.phone} type="text" floating={false} />
            <InputForm label="Email" name="email" register={register} errors={errors.email} type="text" floating={false} />
            <InputForm label="Activo" name="active" register={register} errors={errors.active} type="select" options={[{ value: "true", label: "Si" }, { value: "false", label: "No" },]} floating={false} />
        </Modal>
    );
};