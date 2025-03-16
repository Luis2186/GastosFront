import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuthStore from '../users/store/useAuthStore';


interface PrivateRouteProps {
    element: React.ReactNode; // Elemento a renderizar si el usuario tiene acceso
    roles?: string[]; // Roles permitidos para acceder a la ruta
    pathErrorRedirect: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, roles, pathErrorRedirect }) => {
    const { user, isAuthenticated, status } = useAuthStore();

    // Si estamos en "checking", mostramos un loading o placeholder
    if (status === 'checking') {
        return <div>Loading...</div>;
    }

    // Si no está autenticado, redirigimos al login
    if (!isAuthenticated) {
        return <Navigate to="/Login" />;
    }

    // Si tiene roles definidos, verificamos si el usuario tiene el rol adecuado
    if (roles && !roles.some((role) => user?.roles?.includes(role))) {
        return <Navigate to={pathErrorRedirect} />;
    }

    return <>{element}</>; // Si está autenticado y tiene el rol adecuado, renderizamos el elemento
};

export default PrivateRoute;