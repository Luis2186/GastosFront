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
// --color-d-main-background: 'linear-gradient(to top, rgba(112, 40, 228), rgba(0, 0, 0))';
// --color-l-main-background: linear-gradient(to top, rgba(255, 255, 255), rgba(255, 255, 255));


// --color-d-gradient-asideMenu: linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.3));
// --color-l-gradient-asideMenu: linear-gradient(to top left, rgba(188, 0, 255, 1), rgba(188, 0, 255, 0.5));

// bg-gradient-to-t from-[rgba(188, 0, 255, 1)] to-[rgba(188, 0, 255, 0.5)] dark:from-[rgba(0, 0, 0, 1))] dark:to-[rgba(0, 0, 0, 0.3)]






// --color-gradient-violet: linear-gradient(to top, #7028e4 0%, #e5b2ca 100%);
// --color-l-gradient-asideMenu: radial-gradient(circle, rgba(233, 179, 252, 1) 0%, rgba(191, 143, 255, 1) 100%);