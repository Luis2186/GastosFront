import jwt from 'jsonwebtoken';  

// export const formatDate = (dateString) => {
//     if(!dateString) return '';
//     const [ month, day, year] = dateString.split("/"); // Dividir por "/"

//     return `${year}-${month}-${day}`; // Reordenar en formato "aaaa-mm-dd"
//   };

  export const verifyAuth = async (token) => {
    if (!token) {
      return {
        status: "unauthorized",
        msg: "Please pass a request token",
      };
    }

    try {
      // La clave secreta que usas para firmar el token (es importante que esta clave sea segura)
        const secret = import.meta.env.CLAVE_SECRETA || 'mi_clave_secreta'; 
        // Verifica el token
        const decoded = jwt.verify(token, secret);
        const expTimestamp = decoded.exp;
        const currentTimestamp = Math.floor(Date.now() / 1000);

        const expDate = new Date(expTimestamp * 1000);
        const currentDate =  new Date(); 

        // Calcular la diferencia de tiempo en milisegundos
        const timeDifference = expDate - currentDate;
        const timeDifferenceInMinutes = timeDifference / 1000 / 60;
        let closeToExpiration= false;

        // Comprobar si faltan 5 minutos o menos para la expiración
        if (timeDifferenceInMinutes <= 5 && timeDifferenceInMinutes > 0) {
            closeToExpiration = true
        } 

        decoded.roles = Array.isArray(decoded?.roles)
        ? decoded.roles.map((rol) => rol.toLowerCase())
        : [decoded.roles.toLowerCase()];

        return {
            status: "authorized",
            closeToExpiration,
            payload: decoded,
            msg: "successfully verified auth token",
        };
    } catch (err) {
        console.debug(err);
        return { status: "error", msg: "could not validate auth token" };
    }
  };

    export const tokenValid = async (token) => {
    
        const tokenValidation = await verifyAuth(token);
        return tokenValidation?.status == "authorized";
    }

    export const tokencloseToExpiration = async (token) => {
    
        const tokenValidation = await verifyAuth(token);
        return tokenValidation?.closeToExpiration;
    }