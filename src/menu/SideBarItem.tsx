import React, { ReactNode } from "react";

interface SideBarItemProps {
    id?: string;
    href?: string;
    title: string;
    children?: ReactNode;
    onClick?: () => void;
}

const className = "text-color flex w-60 align-middle justify-items-start rounded-lg px-2 py-0.5 hover-text ";

export const SideBarItem: React.FC<SideBarItemProps> = ({ id, href = "#", title, children, onClick }) => {
    return (
        <li className="h-full flex justify-start align-middle w-full" onClick={onClick}>
            <a id={id} href={href} className={className}>
                {children}
                <span className="p-1">{title}</span>
            </a>
        </li>
    );
};