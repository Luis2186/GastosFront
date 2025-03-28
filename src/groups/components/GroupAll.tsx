import { useEffect, useState } from "react"
import useAuthStore from "../../users/store/useAuthStore"
import { Group } from "../../domain/types/Group"
import { groupRepository } from "../api/groupsApi"
import { GenericTable } from "../../components/GenericTable"




export const GroupAll = () => {

    const { user } = useAuthStore()
    const [groupExpensive, setGroupExpensive] = useState<Group[] | null>()
    const [data, setData] = useState<any>();
    const [columns, setColumns] = useState<string[]>([]);

    useEffect(() => {
        const getGroups = async (idUser: string) => {
            // Simulamos una llamada al repositorio de grupos (deberías reemplazarlo con tu lógica)
            const groups: Group[] | null = await groupRepository.getAllByUser(idUser);
            setGroupExpensive(groups);

            if (groups) {
                // Define las columnas
                const cols = ["Nombre", "Descripcion"];

                // Mapea los grupos a los datos de la tabla
                const data = groups.map((group) => ({ Nombre: group.name, Descripcion: group.description }));

                // Actualiza las columnas y los datos
                setColumns(cols);
                setData(data);
            }
        };

        if (user?.id) {
            getGroups(user.id); // Llamada a getGroups solo si hay un usuario con ID
        }
    }, [user?.id]); // Agregar user?.id como dependencia para que se ejecute cuando el ID del usuario cambie

    console.log(columns, data)
    return (
        <div className="w-full h-full">
            {
                data && columns && <GenericTable columns={columns} data={data} />
            }
        </div>
    )
}
