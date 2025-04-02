

interface ModalProps {
    title: string;
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
    children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ title, isOpen, onClose, onSubmit, children }) => {

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/30 bg-opacity-50">
                    <div className="relative bg-white dark:bg-gradient-to-br from-primary-800 to-primary-950 rounded-lg shadow-lg max-w-lg w-full p-6 text-light_text">
                        <div className="flex justify-between items-center border-b border-light_text_menu pb-4">
                            <h3 className="text-xl font-semibold text-primary-700 dark:text-dark_text">{title}</h3>
                            <button onClick={onClose} className="text-primary-700 hover:text-primary-800 dark:text-dark_text">
                                <svg className="w-6 h-6" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                    <path
                                        fillRule="evenodd"
                                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                        </div>
                        <form onSubmit={(e) => { e.preventDefault(); onSubmit(e); }} className="space-y-4 mt-4">
                            {children}
                            <div className="flex justify-end space-x-4 mt-6">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="px-4 py-2 text-sm text-light_text_menu/80 dark:text-dark_text border border-light_hover/50 rounded-md hover:bg-light_hover/50"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 text-sm text-white bg-primary-600 rounded-md hover:bg-primary-700 focus:ring-2 focus:ring-primary-500"
                                >
                                    Aceptar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};