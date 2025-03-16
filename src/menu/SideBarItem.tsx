import React, { ReactNode } from "react";

interface SideBarItemProps {
    id?: string;
    href?: string;
    title: string;
    children?: ReactNode;
}

const className = "dark:text-dark_text_menu flex-1 ms-3 whitespace-nowrap text-light_text_menu hover:text-primary-100 flex align-middle ";

export const SideBarItem: React.FC<SideBarItemProps> = ({ id, href = "#", title, children }) => {
    return (
        <li className="h-full flex justify-center align-middle w-full p-1">
            <a id={id} href={href} className={className}>
                {children}
                <span className="p-1">{title}</span>
            </a>
        </li>
    );
};