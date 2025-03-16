import useAuthStore from "../store/useAuthStore"


export const UserCard = () => {

    const { user } = useAuthStore()


    return (
        <div className="bg-black text-white flex align-middle justify-center h-16 items-center">
            {user?.name + " " + user?.lastName}
        </div>
    )
}
