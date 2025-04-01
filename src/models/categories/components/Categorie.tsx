import { useEffect, useState } from 'react'
import { useCategories } from '../hooks/useCategories'
import { SubCategories } from './SubCategories';
import { Categorie as TCategorie } from '../../../domain/types/Categorie';
import useAuthStore from '../../users/store/useAuthStore';
import { isErrorMessage } from '../../../utils/typeGuards';

const obtenerNombreImg = (nombre: string) => {
    // Usamos toLowerCase() para que la comparación no distinga entre mayúsculas y minúsculas
    const nombreLower = nombre.toLowerCase();

    if (nombreLower.includes("fijos")) {
        return "fijos.png";
    } else if (nombreLower.includes("ahorro")) {
        return "ahorro.png";
    } else if (nombreLower.includes("familiar")) {
        return "familiar.png";
    } else if (nombreLower.includes("variable")) {
        return "variable.png";
    } else if (nombreLower.includes("imprevisto")) {
        return "imprevisto.png";
    } else {
        return ""; // En caso de no encontrar ninguna coincidencia
    }
}


export const Categorie = () => {
    const { handleGetAllCategories } = useCategories();
    //const {categories} = useCategorieStore(state => state); 
    const [categories, setCategories] = useState<TCategorie[] | null>([])
    const [currentCategorie, setCurrentCategorie] = useState<TCategorie>()
    const { user } = useAuthStore()
    const groupId = user?.expenseGroup && user.expenseGroup.length > 0
        ? Number(user.expenseGroup[0].id) || 0
        : 0;

    const handleCategorie = (categorie: TCategorie) => {
        setCurrentCategorie(categorie);
    };

    useEffect(() => {
        // If handleGetAllCategories returns a promise, use async/await
        const fetchCategories = async () => {
            const categories = await handleGetAllCategories();
            if (!isErrorMessage(categories)) setCategories(categories);
        };

        fetchCategories();
    }, [])


    return (
        <div className="container flex-col w-full h-full m-auto">
            <div className='w-full h-auto flex flex-row gap-5 justify-center items-center p-3 my-5 mb-10'>
                {categories?.map(categorie => (
                    <button key={categorie.id} className='flex align-middle place-items-center gap-1 px-3 py-1 text-white dark:text-dark_text
                bg-light_main/60 rounded-xl hover:bg-light_hover focus:bg-light_focus active:bg-light_active focus:outline-none focus:ring focus:ring-light_focus/10
                dark:bg-dark_main dark:hover:bg-primary-600'
                        onClick={() => handleCategorie(categorie)}
                    >
                        <img src={`../../../public/img/${obtenerNombreImg(categorie.name)}`} alt={"Icono_Gasto_" + categorie.name} className='w-10 ' />
                        <p className=''> {categorie.name}  </p>
                        {/* <p> {categorie.descripcion}  </p>         */}
                    </button>
                ))}
            </div>
            {currentCategorie && (

                <div className='flex w-full justify-center '>
                    <SubCategories categoriaId={currentCategorie.id} groupId={groupId} />
                </div>
            )}
        </div>
    )
}
