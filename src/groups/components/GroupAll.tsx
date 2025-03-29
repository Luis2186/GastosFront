import { useEffect, useState } from "react"
import useAuthStore from "../../users/store/useAuthStore"
import { Group } from "../../domain/types/Group"
import { groupRepository } from "../api/groupsApi"
import { GenericTable } from "../../components/GenericTable"
import { errorMessage } from "../../types/input"
import { isErrorMessage } from "../../utils/typeGuards"




export const GroupAll = () => {

    const { user } = useAuthStore()
    const [data, setData] = useState<any>();
    const [columns, setColumns] = useState<string[]>([]);

    useEffect(() => {
        const getGroups = async (idUser: string) => {
            // Simulamos una llamada al repositorio de grupos (deberías reemplazarlo con tu lógica)
            const groups: Group[] | errorMessage = await groupRepository.getAllByUser(idUser);
            console.log(groups)
            if (groups && !isErrorMessage(groups)) {
                // Define las columnas
                const cols = ["Nombre", "Descripcion", "Admin"];

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
                data && columns && <GenericTable columns={columns} data={data} />
            }
        </div>
    )
}
