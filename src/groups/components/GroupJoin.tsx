import { useEffect, useState } from "react";
import { Group } from "../../domain/types/Group";
import { groupRepository } from "../api/groupsApi";
import useAuthStore from "../../users/store/useAuthStore";
import { JoinGroup } from "../api/types/GroupResult";
import { DropdownSearch } from "../../components/DropdownSearch";
import { InputForm } from "../../components/InputForm";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { errorMessage } from "../../types/input";
import { isErrorMessage } from "../../utils/typeGuards";
import { toast } from "react-toastify";

export const GroupJoin = () => {
    const { user } = useAuthStore()
    const [groups, setGroups] = useState<Group[]>([]);
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<Group>({
    });

    const onSubmit = async (data: Group) => {

        const joinGroupData: JoinGroup = {
            userId: user?.id ?? "",
            code: data.accessCode ?? "",
            groupId: 3033
        }

        const response = await groupRepository.joinGroup(joinGroupData)

        if (isErrorMessage(response)) {
            toast.error(response.detail)
        } else {
            navigate("/Home/view-all")
        }

    };

    useEffect(() => {

        const fetchGroups = async () => {
            const groups: Group[] | errorMessage = await groupRepository.getAll(); // Aquí haces la solicitud a tu API o repositorio

            if (!isErrorMessage(groups)) setGroups(groups)

            return groups;
        };
        fetchGroups();
    }, [])

    const handleGroupSelect = (group: Group) => {
        console.log("Group selected:", group);
    };


    return (
        <div className="w-full h-full flex flex-col justify-center">
            <h2 className="text-light_main dark:text-dark_title text-3xl tracking-wide w-full flex justify-center h-auto m-2">
                {"Unirse a un grupo"}
            </h2>

            <div className="h-auto w-full p-4 border border-light_active rounded-lg shadow sm:p-6 md:p-8 bg-primary-50 bg-opacity-40 dark:bg-gradient-to-br from-primary-800 to-primary-950 dark:border-white-700">
                <form className="flex flex-col justify-center w-full h-auto gap-2" onSubmit={handleSubmit(onSubmit)}>
                    <div className="w-full h-auto grid grid-cols-1 gap-2">
                        <DropdownSearch
                            items={groups ?? []}
                            label="Buscar Grupo"
                            keyExtractor={(group) => group.id.toString()}
                            onSelect={handleGroupSelect}
                            searchKey={(group) => group.name}
                            placeholder="Buscar grupo"
                        />

                        <InputForm type="text" name="accessCode" label="Codigo de unión" register={register} errors={errors.accessCode} />
                    </div>
                    <button type="submit" className="text-white bg-dark_text_menu hover:bg-light_text_menu focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-md w-full sm:w-2/6 px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 mt-5 m-auto">
                        {"Unirse"}
                    </button>
                </form>
            </div>
        </div>
    )
}
