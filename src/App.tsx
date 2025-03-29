import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './users/components/Login';
import PrivateRoute from './routes/PrivateRoute';
import Register from './users/components/Register';
import { FinHealth } from './FinHealth';
import { Categorie } from './categories/components/Categorie';
import { GroupHome } from './groups/components/GroupHome';
import { UserAdministration } from './users/components/UserAdministration';

const App = () => {
    return (
        <div className="bg-gray-100 min-h-full min-w-full m-0 p-0">
            <Router>
                <Routes>
                    <Route path="/Register" element={<Register />} />

                    {/* Rutas protegidas */}
                    <Route path="/" element={
                        <PrivateRoute
                            element={<FinHealth />} // Este es el layout que contiene las rutas anidadas
                            roles={['Admin', 'Sys_Adm', 'Usuario']}
                            pathErrorRedirect="/Login"
                        />
                    }>
                        {/* Estas son las rutas anidadas que se cargarán dentro de FinHealth */}
                        <Route path="/UsersAdministration" element={<UserAdministration />} />
                        <Route path="/Categories" element={<Categorie />} />
                        <Route path="/Home/*" element={<GroupHome />} />
                        {/* Puedes agregar más rutas aquí según lo necesites */}

                    </Route>


                    {/* Si ninguna ruta coincide */}
                    <Route path="*" element={<Login />} />
                </Routes>
            </Router>
        </div>
    )
}

export default App