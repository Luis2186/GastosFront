import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import { UserAdministration } from '../models/users/components/UserAdministration';
import { Categorie } from '../models/categories/components/Categorie';

export const FinHealthRoutes = () => {

    return (
        <Routes>
            <Route path="/Administration"
                element={
                    <PrivateRoute
                        element={<UserAdministration />}
                        roles={['Admin', 'Sys_Adm']}
                        pathErrorRedirect="/"
                    />
                }
            />

            <Route path="/Categories"
                element={
                    <PrivateRoute
                        element={<Categorie />}
                        roles={['Admin', 'Sys_Adm', 'Usuario']}
                        pathErrorRedirect="/"
                    />
                }
            />
        </Routes>
    )
}
