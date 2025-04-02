import { faTrashCan, faPenToSquare, faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { useSubCategories } from '../hooks/useSubCategories';
import { SubCategorie } from '../../../domain/types/SubCategorie';
import { isErrorMessage } from '../../../utils/typeGuards';
import { GenericTable } from '../../../components/GenericTable';
import { errorMessage } from '../../../types/input';
import { SubCategoriesCreate } from './SubCategoriesCreate';
import { mapSubCategorieResultToSubCategorie } from '../api/types/SubCategoriesResult';
import { subCategoriesRepository } from '../api/subCategoriesApi';


interface subCat {
    groupId: number,
    categoriaId: number
}

export const SubCategories = ({ groupId, categoriaId }: subCat) => {
    const { handleGetAllSubCategories } = useSubCategories();
    const [subCategories, setSubCategories] = useState<SubCategorie[] | null | undefined>([]);
    const [currentSubCategory, setCurrentSubCategory] = useState<SubCategorie | null>(null);
    const [data, setData] = useState<any>();
    const [columns, setColumns] = useState<any[]>([]);

    useEffect(() => {
        // If handleGetAllCategories returns a promise, use async/await
        const fetchSubCategories = async () => {
            const subCategories: SubCategorie[] | errorMessage = await handleGetAllSubCategories(groupId, categoriaId);

            if (isErrorMessage(subCategories)) return subCategories;

            setSubCategories(subCategories);

            if (subCategories?.length) {

                const cols = [
                    { name: 'Nombre' },
                    { name: 'Descripcion' },
                    {
                        name: 'Accion',
                        render: (row: any) => (
                            <>
                                <button
                                    //onClick={() => handleModal(user)}
                                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                >
                                    <FontAwesomeIcon icon={faPenToSquare} className='fa-xl pr-5 text-light_icons dark:text-dark_icons' />
                                </button>

                                <button
                                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                    onClick={() => subCategoriesRepository.delete(row.id)}
                                >
                                    <FontAwesomeIcon icon={faTrashCan} className='fa-xl text-red-500 pr-5' />
                                </button>
                            </>
                        ),
                    },

                ];
                setColumns(cols);  // Actualiza el estado `columns` con la lista de columnas procesada

                const dataSubCategorie = subCategories.map((cat) => ({
                    Id: cat.id,
                    Nombre: cat.name,
                    Descripcion: cat.description,
                }));
                setData(dataSubCategorie);  // Actualiza el estado `data` con la lista de usuarios procesada
            }
        };

        fetchSubCategories();

    }, [categoriaId, subCategories])


    // Función que maneja la fila seleccionada
    const handleRowSelection = (row: any) => {
        let subCat = mapSubCategorieResultToSubCategorie(row)
        subCat = { ...subCat, groupId: groupId, categorieId: categoriaId }
        setCurrentSubCategory(subCat);  // Puedes hacer lo que necesites con la fila seleccionada
        console.log(currentSubCategory)
    };

    // Función que maneja la fila seleccionada
    const clearSubCategorie = () => {
        setCurrentSubCategory(null);  // Puedes hacer lo que necesites con la fila seleccionada

    };


    return (

        <div className="relative overflow-x-auto  sm:rounded-lg w-11/12 h-full bg-l-gradient-asideMenu">
            {/* 
            <div className='container w-full h-full flex justify-end text-light_text_menu hover:text-primary-50 dark:hover:text-white '>
                <button
                    className="font-medium flex gap-2 text-lg  bg-transparent  px-3 py-2 rounded-tr-lg items-center  hover:text-primary-400"
                    onClick={() => setIsModalSubCatOpen(true)}
                >
                    <span className=''>Agregar categoria </span>
                    <FontAwesomeIcon icon={faCirclePlus} className='fa-lg ' />
                </button>
            </div> */}

            <div className='grid grid-cols-8 gap-5'>

                <div className='col-span-8'>
                    {subCategories &&
                        <GenericTable data={data} columns={columns} itemsPerPage={5} onSelectedRow={handleRowSelection} />
                    }
                </div>


                <div className='col-span-4 bg-gradient h-auto rounded-md p-5'>
                    <i className="fa-solid fa-arrow-rotate-right" onClick={clearSubCategorie}></i>
                    {groupId && categoriaId &&
                        <SubCategoriesCreate
                            subCategorie={currentSubCategory ?? undefined}
                            groupId={groupId}
                            categorieId={categoriaId}
                        />
                    }
                </div>





            </div>


        </div>

    )
}
