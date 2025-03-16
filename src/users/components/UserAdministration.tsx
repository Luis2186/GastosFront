import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGear, faUserPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import useUserStore from '../store/useUserStore';
import { useUser } from '../hooks/useUser.ts';
import '../styles/DataAdminStyles.css'
import { UserModal } from './UserModal';
import { RolesModal } from './RolesModal';
import { User } from '../../domain/types/User.ts';

export const UserAdministration = () => {
    const { users } = useUserStore()
    const { handleGetAllUsers, handleUpdate, handleRemoveUser } = useUser();
    const [isModalUserOpen, setIsModalUserOpen] = useState(false);
    const [isModalRolesOpen, setIsModalRolesOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedUser, setSelectedUser] = useState<User>();

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
    }, [users])



    const handleModal = (usuario: User) => {
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
    const filteredUsers = users.filter(user =>
        user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.lastName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className='container mx-auto py-20' >
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg " >
                <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-l-gradient-asideMenu dark:bg-gradient-to-br from-primary-800 to-primary-950">
                    {/* Botón de acción */}
                    <div className='px-5'>
                        <button
                            onClick={() => { }}
                            className="inline-flex items-center text-light_text bg-white border border-primary-300 focus:outline-none hover:bg-primary-100 focus:ring-4 focus:ring-primary-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-primary-800 dark:text-dark_text dark:border-primary-600 dark:hover:bg-primary-700 dark:hover:border-primary-600 dark:focus:ring-primary-700"
                            type="button"
                        >
                            Action
                            <svg
                                className="w-2.5 h-2.5 ms-2.5"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 10 6"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m1 1 4 4 4-4"
                                ></path>
                            </svg>
                        </button>
                    </div>

                    {/* Campo de búsqueda */}
                    <div className="relative px-5">
                        <input
                            type="text"
                            id="table-search-usuarios"
                            className="block pt-2 ps-10 text-sm text-light_text border border-primary-300 rounded-lg w-80 bg-primary-50 focus:ring-blue-500 focus:border-primary-500 dark:bg-primary-700 dark:border-primary-600 dark:placeholder-primary-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="Buscar usuarios"
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                    </div>
                </div>

                {/* Tabla de usuarios */}
                <table className="w-full text-sm text-left rtl:text-right text-light_text dark:text-dark_text ">
                    <thead className="text-xs text-light_text uppercase bg-primary-50 dark:bg-dark_main/85 dark:text-dark_text">
                        <tr>
                            {/* <th scope="col" className="p-4">
                                <div className="flex items-center">
                                    <input
                                        id="checkbox-all-search"
                                        type="checkbox"
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    />
                                </div>
                            </th> */}
                            <th scope="col" className="px-6 py-3"> Nombre de usuario </th>
                            <th scope="col" className="px-6 py-3"> Nombre </th>
                            <th scope="col" className="px-6 py-3"> Fecha de registro </th>
                            <th scope="col" className="px-6 py-3"> Roles </th>
                            <th scope="col" className="px-6 py-3"> Activo </th>
                            <th scope="col" className="px-6 py-3"> Acciones </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((user) => (
                            <tr key={user.id} className="bg-primary-50 border-b dark:bg-primary-950 dark:border-primary-700 hover:bg-gray-50 dark:hover:bg-primary-700 text-light_text dark:text-dark_text">
                                {/* <td className="w-4 p-4">
                                    <div className="flex items-center">
                                        <input
                                            id={`checkbox-table-search-${user.id}`}

                                            type="checkbox"
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        />
                                    </div>
                                </td> */}

                                <th className="flex items-center px-6 py-4 text-light_text whitespace-nowrap dark:text-dark_text">
                                    {/* <img className="w-10 h-10 rounded-full" src="/docs/images/people/profile-picture-1.jpg" alt="User" /> */}
                                    <div className="ps-3">
                                        <div className="text-base font-semibold ">{user.userName}</div>
                                        <div className="font-normal text-light_text_light dark:text-dark_text_light/80">{user.email}</div>
                                    </div>
                                </th>


                                <td className="px-6 py-4">{user.name + " " + user.lastName}</td>
                                <td className="px-6 py-4">{user.registrationDate.toString()}</td>
                                <td className="px-6 py-4">{user.roles.map(rol => rol + " ")}</td>
                                <td className="px-6 py-4">{user.active ? "Activo" : "Inactivo"}</td>
                                {/* <td className="px-6 py-4">
                                    <div className="flex items-center">
                                        <div className={`h-2.5 w-2.5 rounded-full ${user.nombreDeUsuario === 'Online' ? 'bg-green-500' : 'bg-gray-500'} me-2`}></div>
                                        {user.nombreDeUsuario}
                                    </div>
                                </td> */}
                                <td className="px-2 py-4">
                                    <button
                                        onClick={() => handleModal(user)}
                                        className="font-medium text-light_text dark:text-dark_text hover:underline"
                                    >
                                        <FontAwesomeIcon icon={faUserPen} className='fa-xl pr-5 text-light_icons dark:text-dark_icons' />
                                    </button>

                                    <button
                                        onClick={() => handleModalRoles(user)}
                                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                    >
                                        <FontAwesomeIcon icon={faUserGear} className='fa-xl text-light_icons pr-5 dark:text-dark_icons' />
                                    </button>

                                    <button
                                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                        onClick={() => handleRemoveUser(user.id)}
                                    >
                                        <FontAwesomeIcon icon={faTrashCan} className='fa-xl text-red-600 pr-5 dark:text-red-500' />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
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