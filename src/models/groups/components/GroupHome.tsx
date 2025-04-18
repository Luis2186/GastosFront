import { ButtonGroup } from "../../../components/ButtonGroup";
import { ButtonGroups } from "../../../components/ButtonsGroups";
import { GroupCreate } from "./GroupCreate";
import { Route, Routes } from "react-router-dom";
import { GroupJoin } from "./GroupJoin";
import PrivateRoute from "../../../routes/PrivateRoute";
import { GroupAll } from "./GroupAll";

export const GroupHome = () => {

    return (
        <>
            <div className="container flex-col w-full h-full m-auto">
                <div className="grid grid-cols-4 gap-4 h-auto py-5">
                    {/* <div className="col-span-4 row-span-2 flex items-center p-2 justify-center">
                        <GroupTitle haveGroup={haveGroup} />
                    </div> */}

                    <div className="col-span-4 h-auto flex justify-center align-middle mb-5">
                        <ButtonGroups cols={3} >
                            <ButtonGroup
                                title="Unirse"
                                icon={<i className="fa-solid fa-handshake fa-lg fa-rotate-180 self-center w-7 text-start"></i>}
                                position="left"
                                to="/Home/join" // Ruta relativa
                                onClick={() => { }}
                            />
                            <ButtonGroup
                                title="Ver Todos"
                                icon={<i className="fa-solid fa-users fa-lg self-center w-7 text-start"></i>}
                                position="center"
                                to="/Home/view-all" // Ruta relativa
                                onClick={() => { }}
                            />
                            <ButtonGroup
                                title="Crear"
                                icon={<i className="fa-solid fa-circle-plus fa-lg fa-rotate-180 self-center w-7 text-start"></i>}
                                position="rigth"
                                to="/Home/create" // Ruta relativa
                                onClick={() => { }}
                            />
                        </ButtonGroups >
                    </div>

                    {/* Rutas y componentes */}

                    <Routes>

                        {/* <Route path="/" element={
                        <PrivateRoute
                            element={<FinHealth />} // Este es el layout que contiene las rutas anidadas
                            roles={['Admin', 'Sys_Adm', 'Usuario']}
                            pathErrorRedirect="/Login"
                        />
                    }> */}


                        <Route
                            path="join"
                            element={
                                <PrivateRoute
                                    roles={['Admin', 'Sys_Adm', 'Usuario']}
                                    pathErrorRedirect="/Login"
                                >
                                    <div className="col-start-2 col-span-2 flex h-auto justify-center">
                                        <GroupJoin />
                                    </div>
                                </PrivateRoute>
                            }
                        />

                        {/* Ruta protegida para crear */}
                        <Route
                            path="create"
                            element={
                                <PrivateRoute
                                    roles={['Admin', 'Sys_Adm', 'Usuario']}
                                    pathErrorRedirect="/Login"
                                >
                                    <div className="col-start-2 col-span-2 flex h-auto justify-center">
                                        <GroupCreate />
                                    </div>
                                </PrivateRoute>
                            }
                        />

                        {/* Ruta protegida para ver todos */}
                        <Route
                            path="view-all"
                            element={
                                <PrivateRoute
                                    roles={['Admin', 'Sys_Adm', 'Usuario']}
                                    pathErrorRedirect="/Login"
                                >
                                    <div className="col-span-4 flex h-auto justify-center">
                                        <GroupAll />
                                    </div>
                                </PrivateRoute>
                            }
                        />
                    </Routes>

                    {/* Renderizado de componentes según el estado de activeComponent */}
                    {/* {activeComponent === "join" ? (
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
                    )} */}

                </div>
            </div>
        </>

    )
}
