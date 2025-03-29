import axios from 'axios';

// Crea una instancia de axios con configuración predeterminada
const axiosInstance = axios.create({
    baseURL: "https://localhost:7292",//import.meta.env.PUBLIC_API_URL, // Utiliza tu variable de entorno para la URL base
    //timeout: 10000,  // Tiempo de espera de 5 segundos (puedes ajustarlo según lo necesites)
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json', // Establece el tipo de contenido por defecto
    },
});


// Interceptor de respuesta para manejar el código de estado 401 (Unauthorized)
axiosInstance.interceptors.response.use(
    response => {
        return response;  // Si la respuesta es exitosa, simplemente la retornamos
    },
    error => {
        // Si la respuesta es un 401, redirigimos al login
        console.log(error)
        if (error.response && error.response.status === 401) {
            // Token inválido o expirado. Redirigiendo al login.
            window.location.href = '/SignIn'; // Usando window.location para redirigir
        }


        //   if (error.code == 'ERR_NETWORK' ) {
        //     // Token inválido o expirado. Redirigiendo al login.
        //     window.location.href = '/LoginPage'; // Usando window.location para redirigir
        //   }

        return Promise.reject(error);
    }
);


export default axiosInstance;