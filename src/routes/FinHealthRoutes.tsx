import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import { UserAdministration } from '../models/users/components/UserAdministration';
import { Categorie } from '../models/categories/components/Categorie';

export const FinHealthRoutes = () => {

    return (
        <Routes>
            <Route
                path="/Administration"
                element={
                    <PrivateRoute
                        roles={['Admin', 'Sys_Adm']}
                        pathErrorRedirect="/"
                    >
                        <UserAdministration /> {/* Pasas el componente como children */}
                    </PrivateRoute>
                }
            />

            <Route
                path="/Categories"
                element={
                    <PrivateRoute
                        roles={['Admin', 'Sys_Adm', 'Usuario']}
                        pathErrorRedirect="/"
                    >
                        <Categorie /> {/* Pasas el componente como children */}
                    </PrivateRoute>
                }
            />
        </Routes>
    )
}
