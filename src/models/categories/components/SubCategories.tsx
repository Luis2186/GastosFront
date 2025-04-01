import { faTrashCan, faPenToSquare, faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { useSubCategories } from '../hooks/useSubCategories';
import { SubCategorie } from '../../../domain/types/SubCategorie';
import { isErrorMessage } from '../../../utils/typeGuards';
import { GenericTable1 } from '../../../components/GenericTable1';
import { errorMessage } from '../../../types/input';


interface subCat {
    groupId: number,
    categoriaId: number
}

export const SubCategories = ({ groupId, categoriaId }: subCat) => {
    const { handleGetAllSubCategories } = useSubCategories();
    const [subCategories, setSubCategories] = useState<SubCategorie[] | null | undefined>([]);
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
                                //onClick={() => handleRemoveUser(user.id)}
                                >
                                    <FontAwesomeIcon icon={faTrashCan} className='fa-xl text-red-500 pr-5' />
                                </button>
                            </>
                        ),
                    },

                ];
                setColumns(cols);  // Actualiza el estado `columns` con la lista de columnas procesada

                const dataSubCategorie = subCategories.map((cat) => ({
                    Nombre: cat.name,
                    Descripcion: cat.description,
                }));
                setData(dataSubCategorie);  // Actualiza el estado `data` con la lista de usuarios procesada
            }
        };

        fetchSubCategories();

    }, [categoriaId])


    return (

        <div className="relative overflow-x-auto  sm:rounded-lg w-9/12 h-full bg-l-gradient-asideMenu">

            <div className='container w-full h-full flex justify-end text-light_text_menu hover:text-primary-50 dark:hover:text-white '>
                <button
                    className="font-medium flex gap-2 text-lg  bg-transparent  px-3 py-2 rounded-tr-lg items-center  hover:text-primary-400"
                //onClick={() => handleRemoveUser(user.id)}
                >
                    <span className=''>Agregar categoria </span>
                    <FontAwesomeIcon icon={faCirclePlus} className='fa-lg ' />
                </button>
            </div>

            {subCategories &&
                <GenericTable1 data={data} columns={columns} />
                // <table className="w-full text-sm text-left rtl:text-right text-light_text dark:text-dark_text ">
                //     <thead className="table-head">
                //         <tr>
                //             <th scope="col" className="px-6 py-3">
                //                 Nombre
                //             </th>
                //             <th scope="col" className="px-6 py-3">
                //                 Descripcion
                //             </th>
                //             <th scope="col" className="px-6 py-3 text-center">
                //                 Action
                //             </th>
                //         </tr>
                //     </thead>
                //     <tbody>
                //         {subCategories?.map(subCat => (
                //             <tr className="table-tr" key={subCat.id}>
                //                 <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                //                     {subCat.name}
                //                 </th>
                //                 <td className="px-6 py-4">
                //                     {subCat.description}
                //                 </td>
                //                 <td className="px-2 py-4 flex justify-center">
                //                     <button
                //                         //onClick={() => handleModal(user)}
                //                         className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                //                     >
                //                         <FontAwesomeIcon icon={faPenToSquare} className='fa-xl pr-5 text-light_icons dark:text-dark_icons' />
                //                     </button>

                //                     <button
                //                         className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                //                     //onClick={() => handleRemoveUser(user.id)}
                //                     >
                //                         <FontAwesomeIcon icon={faTrashCan} className='fa-xl text-red-500 pr-5' />
                //                     </button>
                //                 </td>
                //             </tr>
                //         ))}

                //     </tbody>
                // </table>
            }
        </div>

    )
}
