import { useEffect, useState } from "react";
import { ButtonGroup } from "../../components/ButtonGroup";
import { ButtonGroups } from "../../components/ButtonsGroups";
import useAuthStore from "../../users/store/useAuthStore";
import { GroupAll } from "./GroupAll";
import { GroupCreate } from "./GroupCreate";

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
    const [activeComponent, setActiveComponent] = useState("viewAll");

    console.log(activeComponent)
    const handleButtonClick = (component: string) => {
        setActiveComponent(component);
    };


    return (
        <>
            <div className="container flex-col w-full h-full m-auto">
                <div className="grid grid-cols-4 gap-4 h-auto py-5">
                    {/* <div className="col-span-4 row-span-2 flex items-center p-2 justify-center">
                        <GroupTitle haveGroup={haveGroup} />
                    </div> */}

                    <div className="col-span-4 h-auto flex justify-center align-middle mb-5">
                        <ButtonGroups cols={3} >
                            <ButtonGroup title="Home"
                                icon={<i className="fa-solid fa-handshake fa-lg fa-rotate-180 self-center w-7 text-start"></i>}
                                position="left"
                                onClick={() => handleButtonClick("join")}
                            />
                            <ButtonGroup
                                title="Home"
                                icon={<i className="fa-solid fa-users fa-lg self-center w-7 text-start"></i>}
                                position="center"
                                onClick={() => handleButtonClick("viewAll")}
                            />
                            <ButtonGroup
                                title="Home"
                                icon={<i className="fa-solid fa-circle-plus fa-lg fa-rotate-180 self-center w-7 text-start"></i>}
                                position="rigth"
                                onClick={() => handleButtonClick("create")}
                            />
                        </ButtonGroups >
                    </div>


                    {/* Renderizado de componentes según el estado de activeComponent */}
                    {activeComponent === "join" ? (
                        <div className="col-start-2 col-span-2 flex h-auto justify-center">
                            <GroupCreate create={false} />
                        </div>
                    ) : activeComponent === "create" ? (
                        <div className="col-start-2 col-span-2 flex h-auto justify-center">
                            <GroupCreate create={true} />
                        </div>
                    ) : (
                        <div className="col-span-4 flex h-auto justify-center">
                            <GroupAll />
                        </div>
                    )}




                </div>

            </div>
        </>

    )
}
