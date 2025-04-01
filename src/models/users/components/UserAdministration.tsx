import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGear, faUserPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import useUserStore from '../store/useUserStore.ts';
import { useUser } from '../hooks/useUser.ts';
import '../styles/DataAdminStyles.css'
import { UserModal } from './UserModal.tsx';
import { RolesModal } from './RolesModal.tsx';
import { User } from '../../../domain/types/User.ts';
import { GenericTable1 } from '../../../components/GenericTable1.tsx';


export const UserAdministration = () => {
    const { users } = useUserStore()
    const { handleGetAllUsers, handleUpdate, handleRemoveUser } = useUser();
    const [isModalUserOpen, setIsModalUserOpen] = useState(false);
    const [isModalRolesOpen, setIsModalRolesOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedUser, setSelectedUser] = useState<User>();

    const [data, setData] = useState<any>();
    const [columns, setColumns] = useState<any[]>([]);

    useEffect(() => {

        // Función para obtener los usuarios
        const fetchUsers = async () => {
            try {
                await handleGetAllUsers();


            } catch (error) {
                console.error("Error fetching usuarios:", error);
            }
        };

        fetchUsers()
    }, [])

    useEffect(() => {
        if (users.length) {

            const cols = [
                { name: 'Nombre de Usuario' },
                { name: 'Nombre' },
                { name: 'Fecha de Registro' },
                { name: 'Roles' },
                { name: 'Activo' },
                {
                    name: 'Acciones',
                    render: (row: any) => (
                        <>
                            <button
                                onClick={() => handleModal(row)}  // Usa `row` aquí
                                className="font-medium text-light_text dark:text-dark_text hover:underline"
                            >
                                <FontAwesomeIcon icon={faUserPen} className='fa-xl pr-5 text-light_icons dark:text-dark_icons' />
                            </button>

                            <button
                                onClick={() => handleModalRoles(row)}  // Usa `row` aquí también
                                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                            >
                                <FontAwesomeIcon icon={faUserGear} className='fa-xl text-light_icons pr-5 dark:text-dark_icons' />
                            </button>

                            <button
                                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                onClick={() => handleRemoveUser(row.id)}  // Usa el `id` de `row`
                            >
                                <FontAwesomeIcon icon={faTrashCan} className='fa-xl text-red-600 pr-5 dark:text-red-500' />
                            </button>
                        </>
                    ),
                },

            ];
            setColumns(cols);  // Actualiza el estado `columns` con la lista de columnas procesada

            const dataUser = users.map((user) => ({
                id: user.id,
                nombreDeUsuario: user.userName,
                nombre: user.name + " " + user.lastName,
                fechaDeRegistro: user.registrationDate.toString(),
                roles: user.roles.map(rol => rol + " "),
                activo: user.active ? "Activo" : "Inactivo",
                acciones: user.id
            }));
            setData(dataUser);  // Actualiza el estado `data` con la lista de usuarios procesada
        }
    }, [users]);


    const handleModal = (usuario: User) => {
        console.log(usuario)
        setSelectedUser(usuario)
        setIsModalUserOpen(!isModalUserOpen)
    }

    const handleModalRoles = (usuario: User) => {
        setSelectedUser(usuario)
        setIsModalRolesOpen(!isModalRolesOpen)
    }

    // Función para manejar la búsqueda
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };


    // Filtrar los usuarios por la búsqueda
    // const filteredUsers = users.filter(user =>
    //     user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    //     user.lastName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    //     user.email?.toLowerCase().includes(searchQuery.toLowerCase())
    // );

    return (
        <div className='container mx-auto py-20' >
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg " >

                <GenericTable1 data={data} columns={columns} />

                {isModalUserOpen && selectedUser &&
                    <UserModal
                        user={selectedUser}
                        isOpen={isModalUserOpen}
                        onClose={() => setIsModalUserOpen(false)}
                        onUpdate={handleUpdate}
                    />
                }

                {isModalRolesOpen && selectedUser &&
                    <RolesModal
                        user={selectedUser}
                        isOpen={isModalRolesOpen}
                        onClose={() => setIsModalRolesOpen(false)}
                    // onUpdate={handleUpdate}
                    />
                }



            </div>
        </div>
    );
};