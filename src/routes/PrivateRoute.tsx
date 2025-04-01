import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuthStore from '../models/users/store/useAuthStore';

interface PrivateRouteProps {
    children: React.ReactNode; // Elementos a renderizar si el usuario tiene acceso
    roles?: string[]; // Roles permitidos para acceder a la ruta
    pathErrorRedirect: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, roles, pathErrorRedirect }) => {
    const { user, isAuthenticated, status } = useAuthStore();
    const location = useLocation(); // Usamos la ubicación para redirigir después de login

    // Si estamos en "checking", mostramos un loading o placeholder
    if (status === 'checking') {
        return <div>Loading...</div>;
    }

    // Si no está autenticado, redirigimos al login y guardamos la URL actual
    if (!isAuthenticated) {
        return <Navigate to="/Login" state={{ from: location }} />;
    }

    // Si tiene roles definidos, verificamos si el usuario tiene el rol adecuado
    if (roles && !roles.some((role) => user?.roles?.includes(role))) {
        return <Navigate to={pathErrorRedirect} />;
    }

    return <>{children}</>; // Si está autenticado y tiene el rol adecuado, renderizamos los hijos
};

export default PrivateRoute;