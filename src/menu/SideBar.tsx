import { useState } from "react";
import useAuthStore from "../users/store/useAuthStore";
import { SideBarItem } from "./SideBarItem"
import { SideBarMenu } from "./SideBarMenu"
import { ThemeToggle } from "./ThemeToggle";
import { UserCard } from "../users/components/UserCard";

export const SideBar = () => {

    const { user } = useAuthStore();
    const [roles] = useState(user?.roles || []);

    return (
        <div className="flex flex-col h-screen">
            <button
                data-drawer-target="default-sidebar"
                data-drawer-toggle="default-sidebar"
                aria-controls="default-sidebar"
                type="button"
                className="inline-flex absolute items-center p-2 mt-2 ms-3 text-sm text-primary-900 rounded-lg sm:hidden hover:bg-primary-100 focus:outline-none focus:ring-2 focus:ring-primary-200 dark:text-primary-400 dark:hover:bg-primary-700 dark:focus:ring-primary-600 "
            >
                <span className="sr-only">Open sidebar</span>
                <svg
                    className="w-6 h-6"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        clipRule="evenodd"
                        fillRule="evenodd"
                        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                    ></path>
                </svg>
            </button>

            <aside id="default-sidebar" className="top-0 left-0 z-40 fixed md:relative h-screen transition-transform -translate-x-full sm:translate-x-0 sm:block bg-[radial-gradient(circle,_rgba(233,179,252,1)_0%,_rgba(191,143,255,1)_100%)]  dark:bg-[linear-gradient(to_top,_rgba(0,0,0,1),_rgba(0,0,0,0.3))]" aria-label="Sidebar">
                <div className="h-full px-3 overflow-y-auto shadow-2xl">
                    <div className="flex align-middle h-12 my-3 justify-between">
                        <a
                            href="https://flowbite.com"
                            className="flex items-center space-x-3 rtl:space-x-reverse w-44"
                        >
                            <img
                                src="https://flowbite.com/docs/images/logo.svg"
                                className="h-8"
                                alt="Flowbite Logo"
                            />
                            <span
                                className="self-center w-6 text-center text-2xl font-semibold whitespace-nowrap dark:text-dark_text_menu text-light_text_menu"
                            >FinHealth</span>
                        </a>
                        <ThemeToggle />
                    </div>

                    <ul className="space-y-2 font-medium mt-16">
                        <SideBarItem title="Home" href="/Home">
                            <i className="fa-solid fa-house fa-lg flex self-center w-8 text-center"></i>
                        </SideBarItem>

                        <SideBarMenu title="Panel de control" icon={<i className="fa-solid fa-gears fa-lg self-center w-8 text-center "></i>}>

                            {
                                (roles.includes("Sys_Adm") ||
                                    roles.includes("Administrador")) && (
                                    <SideBarItem title="Administracion de usuarios" href={"/UsersAdministration"}>
                                        <i className="fa-solid fa-users fa-lg self-center w-6 text-center" />
                                    </SideBarItem>
                                )
                            }

                            <SideBarItem title="Categorias" href={"/Categories"}>
                                <i className="fa-solid fa-list fa-lg self-center w-6 text-center "></i>
                            </SideBarItem>

                            <SideBarItem title="Monedas" href={""} >
                                <i className="fa-solid fa-dollar-sign fa-lg self-center w-6 text-center "></i>
                            </SideBarItem>
                        </SideBarMenu>

                        {/* <!-- <SideBarItem title="Sign In" href="/LoginPage">
                <i
                    className="fa-solid fa-arrow-right-to-bracket fa-lg"
                    slot="after-title"></i>
            </SideBarItem>

            <SideBarItem title="Sign Up" href="/RegisterPage">
                <i className="fa-regular fa-pen-to-square fa-lg" slot="after-title"
                ></i>
            </SideBarItem> --> */}

                        <SideBarItem title="Sign out" href="/SignIn" id="signOut">
                            <i className="fa-solid fa-arrow-right-to-bracket fa-lg fa-rotate-180 self-center w-8 text-center"></i>
                        </SideBarItem>
                    </ul>

                </div>


            </aside>
            <UserCard />
        </div>
    )
}
