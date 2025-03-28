import { useForm } from "react-hook-form";
import { InputForm } from "../../components/InputForm";
import { createGroup, JoinGroup } from "../api/types/GroupResult";
import { groupRepository } from "../api/groupsApi";
import { Group } from "../../domain/types/Group";
import useAuthStore from "../../users/store/useAuthStore";

interface GroupCreate {
    create: boolean; // Prop que define si se está creando o uniéndose a un grupo
}

export const GroupCreate = ({ create }: GroupCreate) => {
    const { user } = useAuthStore()
    const { register, handleSubmit, formState: { errors } } = useForm<Group>({
        // Resolver y validaciones adicionales si es necesario
    });

    const joinGroup = !create; // `false` para "unirse", `true` para "crear"

    const onSubmit = async (data: Group) => {

        if (!joinGroup) {
            const createData = {
                ...data,
                adminUserId: user?.id ?? ""
            }

            await groupRepository.create(createData)
        } else {
            const joinGroupData: JoinGroup = {
                userId: user?.id ?? "",
                code: data.accessCode ?? "",
                groupId: 3033
            }
            await groupRepository.joinGroup(joinGroupData)
        }
    };

    return (
        <div className="w-full h-full flex flex-col justify-center">
            <h2 className="text-light_main dark:text-dark_title text-3xl tracking-wide w-full flex justify-center h-auto m-2">
                {create ? "Crear grupo" : "Unirse a un grupo"}
            </h2>

            <div className="h-auto w-full p-4 border border-light_active rounded-lg shadow sm:p-6 md:p-8 bg-primary-50 bg-opacity-40 dark:bg-gradient-to-br from-primary-800 to-primary-950 dark:border-white-700">
                <form className="flex flex-col justify-center w-full h-auto gap-2" onSubmit={handleSubmit(onSubmit)}>
                    {joinGroup ? (
                        <div className="w-full h-auto grid grid-cols-1 gap-2">
                            <InputForm type="text" name="accessCode" label="Codigo de unión" register={register} errors={errors.accessCode} />
                        </div>
                    ) : (
                        <div className="w-full h-auto grid grid-cols-3 gap-2">
                            <div className="flex gap-2 col-span-3">
                                <InputForm type="text" name="name" label="Nombre grupo" register={register} errors={errors.name} />
                            </div>
                            <div className="flex gap-2 col-span-3 h-auto">
                                <InputForm type="text" name="description" label="Descripcion" errors={errors.description} register={register} />
                            </div>
                            <div className="flex gap-2 col-1 h-auto">
                                <InputForm type="text" name="accessCode" label="Codigo de acceso" register={register} errors={errors.accessCode} />
                            </div>
                        </div>
                    )}

                    <button type="submit" className="text-white bg-dark_text_menu hover:bg-light_text_menu focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-md w-full sm:w-2/6 px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 mt-5 m-auto">
                        {joinGroup ? "Unirse" : "Crear"}
                    </button>
                </form>
            </div>
        </div>
    );
};