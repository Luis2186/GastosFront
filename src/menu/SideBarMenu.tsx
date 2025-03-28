
import React, { ReactNode, useState } from "react";

interface SideBarMenu {
    title: string;
    icon?: ReactNode;
    children?: ReactNode;
}

const className = "flex items-center w-full p-1 text-base rounded-lg text-color transition duration-75 hover-text"

export const SideBarMenu: React.FC<SideBarMenu> = ({ title, icon, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    return (
        <li >
            <button
                type="button"
                className={className}//"aside_ItemMenu aside_ItemMenu-dark-mode"
                aria-controls="submenu"
                onClick={toggleMenu} // Cambia el estado al hacer clic

            >
                {icon && <span>{icon}</span>}
                <span className="p-1">{title}</span>
            </button>

            <ul id="submenu" className={`${isOpen ? 'block' : 'hidden'} py-2 space-y-2 ml-10`} >
                {children}
            </ul>
        </li>
    )
}
