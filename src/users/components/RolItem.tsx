import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useUser } from '../hooks/useUser.ts';

interface RolItemProps {
    userId: string;
    rol: string;
}

export const RolItem = ({ rol, userId }: RolItemProps,) => {

    const { handleRemoveRolUser } = useUser();


    const handleRemoveRol = async () => {
        console.log(userId, rol)
        const rolEliminado = await handleRemoveRolUser(userId, "", rol)
        // console.log('Valores actuales del formulario:', valores);
    }

    return (
        <div className=' flex '>

            <div className='flex w-10/12 p-2 bg-primary-100 dark:bg-primary-600 rounded-xl justify-center text-light_text dark:text-dark_text'>
                {rol}
            </div>

            <div className='w-2/12 p-2 flex justify-center'>
                <button
                    className="font-medium flex justify-center align-middle items-center"
                    onClick={() => handleRemoveRol()}
                >
                    <FontAwesomeIcon icon={faTrashCan} className='fa-lg text-red-600 dark:text-red-500' />
                </button>
            </div>
        </div>
    )
}
