import { ToastContainer } from "react-toastify";
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
            <main className=" row-span-2 h-screen overflow-y-auto">
                {/* Contenido dentro del main */}
                <Outlet />
            </main>

            <ToastContainer
                position="bottom-left"
                autoClose={3000} // Cierra automáticamente después de 3 segundos
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    )
}




