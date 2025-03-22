import useAuthStore from "../../users/store/useAuthStore";
import { GroupAll } from "./GroupAll";
import { GroupCreate } from "./GroupCreate"

const GroupTitle = ({ haveGroup }: { haveGroup: boolean }) => (
    <h2 className="text-light_main dark:text-dark_title text-3xl tracking-wide">


        {!haveGroup ?
            <>
                ¡Cree un nuevo grupo
                <span className="text-light_hover text-3xl ml-2">
                    o unase a uno!
                </span>
            </>
            :
            <>
                Tus grupos
            </>
        }
    </h2>
);

export const GroupHome = () => {

    const { user } = useAuthStore();
    const haveGroup = (user?.expenseGroup?.length ?? 0) > 0;

    return (
        <>
            <div className="container flex-col w-full h-full m-auto">
                <div className="grid grid-cols-4 grid-rows-12 gap-4 h-full py-5">
                    <div className="col-span-4 row-span-2 flex items-center p-2">
                        <GroupTitle haveGroup={haveGroup} />
                    </div>

                    <div className="col-span-4 row-span-10 flex justify-center mt-10">
                        <GroupAll />
                        {/* {!haveGroup ? <GroupCreate />
                            : <div></div>
                        } */}
                    </div>
                </div>

            </div>
        </>

    )
}
