import { ReactElement } from "react"
import { Link } from "react-router-dom";

interface ButtonGroup {
    title: string
    icon: ReactElement,
    position: string,
    onClick: () => void;
    to?: string; // Esto es para la redirección
}

export const ButtonGroup = ({ title, icon, position, onClick, to }: ButtonGroup) => {
    const rounded = position === "left" ? "rounded-s-full" :
        position === "rigth" ? "rounded-e-full" : "";

    if (to) {
        // Si se pasa "to", se utiliza un Link para la redirección
        return (
            <Link
                to={to}
                className={`inline-flex flex-col items-center justify-center px-5 ${rounded} hover:bg-primary-50 dark:hover:bg-primary-800 group text-color`}
            >
                {icon}
                <span className="sr-only">{title}</span>
            </Link>
        );
    }

    return (
        <>
            <button
                data-tooltip-target={"tooltip-" + title}
                type="button"
                className={`inline-flex flex-col items-center justify-center px-5 ${rounded} hover:bg-primary-50 dark:hover:bg-primary-800 group text-color`}
                onClick={onClick}
            >
                {icon}
                <span className="sr-only">{title}</span>
            </button>

            <div id={"tooltip-" + title} role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-primary-900 rounded-lg shadow-xs opacity-0 tooltip dark:bg-gray-700">
                {title}
                <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
        </>

    )
}
