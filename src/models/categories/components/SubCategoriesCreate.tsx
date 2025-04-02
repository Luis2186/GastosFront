import { useForm } from "react-hook-form";
import { InputForm } from "../../../components/InputForm"
import { SubCategorie } from "../../../domain/types/SubCategorie";
import { useEffect, useState } from "react";
import { subCategoriesRepository } from "../api/subCategoriesApi";
import { isErrorMessage } from "../../../utils/typeGuards";
import { toast } from "react-toastify";

interface ModalSubCategorie {
    subCategorie?: SubCategorie;
    groupId: number;
    categorieId: number;
}

export const SubCategoriesCreate: React.FC<ModalSubCategorie> = ({ categorieId, groupId, subCategorie }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<SubCategorie>({});
    const [crearSubCategoria, setCrearSubCategoria] = useState<boolean>(); // Estado para manejar la creación de subcategorías

    // Este useEffect actualiza los valores del formulario cuando subCategorie cambia
    useEffect(() => {
        if (subCategorie) {
            reset(subCategorie); // Actualizamos los valores del formulario
        } else {
            reset({ name: "", description: "" }); // Reseteamos el formulario con los valores por defecto
        }

        subCategorie ? setCrearSubCategoria(false) : setCrearSubCategoria(true); // Actualizamos el estado de crearSubCategoria

    }, [subCategorie, reset]); // Dependencia de subCategorie y reset

    const onSubmit = async (data: SubCategorie) => {
        let result = null;

        if (crearSubCategoria) {
            const dataCreate = { ...data, groupId, categorieId }
            result = await subCategoriesRepository.create(dataCreate);
        } else {
            result = await subCategoriesRepository.update(data.id, data);
        }

        if (!isErrorMessage(result)) {
            toast.success("Subcategoria creada correctamente");
        } else {
            toast.error("Error al crear la Sub Categoria");
        }

    };



    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 self-center">
            <InputForm
                label="Nombre"
                name="name"
                register={register}
                errors={errors.name}
                type="text"
                floating={false}
            />
            <InputForm
                label="Descripcion"
                name="description"
                register={register}
                errors={errors.description}
                type="text"
                floating={false}
            />
            <div className="flex justify-end space-x-4 mt-6">
                <button
                    type="button"
                    className="px-4 py-2 text-sm text-light_text_menu/80 dark:text-dark_text border border-light_hover/50 rounded-md hover:bg-light_hover/50"
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 text-sm text-white bg-primary-600 rounded-md hover:bg-primary-700 focus:ring-2 focus:ring-primary-500"
                >
                    {crearSubCategoria ? "Crear" : "Actualizar"} Subcategoria
                </button>
            </div>
        </form>
    );
};