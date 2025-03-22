import { SideBar } from "./menu/SideBar"
import { Outlet } from 'react-router-dom';

export const FinHealth = () => {
    return (
        <div className="grid grid-cols-[300px_1fr] grid-rows-[70px_auto] h-full bg-window shadow-lg dark:shadow-md">
            {/* Sidebar */}
            <aside className="row-span-2 ">
                <SideBar />
            </aside>

            {/* Contenido principal */}
            <main className=" row-span-2 ">
                {/* Contenido dentro del main */}
                <Outlet />
            </main>
        </div>
    )
}




