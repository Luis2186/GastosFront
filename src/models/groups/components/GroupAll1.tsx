import { useEffect, useState } from "react"
import useAuthStore from "../../users/store/useAuthStore"
import { Group } from "../../../domain/types/Group"
import { groupRepository } from "../api/groupsApi"
import { errorMessage } from "../../../types/input"
import { isErrorMessage } from "../../../utils/typeGuards"
import { GenericTable1 } from "../../../components/GenericTable1"

export const GroupAll1 = () => {

    const { user } = useAuthStore()
    const [data, setData] = useState<any>();
    const [columns, setColumns] = useState<any[]>([]);


    const handleEdit = (row: any) => {
        console.log('Editando', row);
    };

    const handleDelete = (row: any) => {
        console.log('Eliminando', row);
    };

    useEffect(() => {
        const getGroups = async (idUser: string) => {
            // Simulamos una llamada al repositorio de grupos (deberías reemplazarlo con tu lógica)
            const groups: Group[] | errorMessage = await groupRepository.getAllByUser(idUser);

            if (groups && !isErrorMessage(groups)) {
                // Define las columnas
                const cols = [
                    { name: 'Nombre' },
                    { name: 'Descripcion' },
                    {
                        name: 'Admin',
                        render: (row: any) => {
                            // Verifica si es administrador (adminUserId es igual al id del usuario)
                            return row.admin === "Si" ? (
                                <i className="fa-solid fa-circle-check fa-xl" style={{ color: '#16bd00' }}></i>
                            ) : (
                                <i className="fa-solid fa-circle-xmark fa-xl" style={{ color: '#ff0000' }}></i>
                            );
                        },
                    },

                ];

                // Mapea los grupos a los datos de la tabla
                const data = groups.map((group) => ({ Nombre: group.name, Descripcion: group.description, Admin: user?.id == group.adminUserId ? "Si" : "No" }));

                // Actualiza las columnas y los datos
                setColumns(cols);
                setData(data);
            }

            return groups;
        };

        if (user?.id) {
            getGroups(user.id); // Llamada a getGroups solo si hay un usuario con ID
        }
    }, [user?.id]); // Agregar user?.id como dependencia para que se ejecute cuando el ID del usuario cambie


    return (
        <div className="w-full h-full">
            {
                data && columns && <GenericTable1 columns={columns} data={data} />
            }
        </div>
    )
}
