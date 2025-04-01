import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './models/users/components/Login';
import PrivateRoute from './routes/PrivateRoute';
import Register from './models/users/components/Register';
import { FinHealth } from './FinHealth';
import { Categorie } from './models/categories/components/Categorie';
import { GroupHome } from './models/groups/components/GroupHome';
import { UserAdministration } from './models/users/components/UserAdministration';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const App = () => {
    return (
        <div className="bg-gray-100 min-h-full min-w-full m-0 p-0">
            <Router>
                <Routes>
                    <Route path="/Register" element={<Register />} />

                    {/* Rutas protegidas */}
                    <Route path="/" element={
                        <PrivateRoute
                            roles={['Admin', 'Sys_Adm', 'Usuario']}
                            pathErrorRedirect="/Login"
                        >
                            <FinHealth /> {/* Aquí pasas FinHealth como children */}
                        </PrivateRoute>
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

            <ToastContainer
                position="bottom-right"
                autoClose={3000} // Cierra automáticamente después de 3 segundos
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    )
}

export default App