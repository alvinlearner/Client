// authContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import swal from 'sweetalert';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(() => {
    // Initialize admin state from sessionStorage, if available
    const storedAdmin = sessionStorage.getItem('admin');
    return storedAdmin ? JSON.parse(storedAdmin) : null;
  });

  const login = async ({ username, password }) => {
    try {
      const response = await fetch('https://insurance-u3z5.onrender.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Invalid login credentials');
      }

      const adminData = await response.json();
      setAdmin(adminData);

      // Save admin data to sessionStorage
      sessionStorage.setItem('admin', JSON.stringify(adminData));

      return adminData;
    } catch (error) {
      throw new Error('An error occurred during login');
    }
  };

  const logout = async () => {
    try {
      const result = await swal({
        title: "Are you sure?",
        text: "You will be logged out!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      });

      if (result) {
        const response = await fetch('https://insurance-u3z5.onrender.com/logout', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Logout failed');
        }

        setAdmin(null);

        // Remove admin data from sessionStorage
        sessionStorage.removeItem('admin');

        // Navigate to "/"
        window.location.href = "/";
      }
    } catch (error) {
      throw new Error('An error occurred during logout');
    }
  };

  // Cleanup localStorage on component unmount
  useEffect(() => {
    return () => sessionStorage.removeItem('admin');
  }, []);

  return (
    <AuthContext.Provider value={{ admin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};



// // authContext.js
// import { createContext, useContext, useState, useEffect } from 'react';
// import { Navigate } from 'react-router-dom';

// import swal from 'sweetalert';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [admin, setAdmin] = useState(() => {
//     // Initialize admin state from localStorage, if available
//     const storedToken = localStorage.getItem('jwtToken');
//     return storedToken ? decodeToken(storedToken) : null;
//   });

//   const login = async ({ username, password }) => {
//     try {

//       const response = await fetch('https://insurance-u3z5.onrender.com/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Accept:"application/json",
//           Authorization: localStorage.token
//         },
//         body: JSON.stringify({ username, password }),
//       });
      

//       if (!response.ok) {
//         throw new Error('Invalid login credentials');
//       }

//       const { admin, jwt } = await response.json();
//       setAdmin(admin);

//       // Save JWT token to localStorage
//       localStorage.setItem('jwtToken', jwt);

//       return admin;
//     } catch (error) {
//       throw new Error('An error occurred during login');
//     }
//   };


//   const logout = async () => {
//         try {
//           const result = await swal({
//             title: "Are you sure?",
//             text: "You will be logged out!",
//             icon: "warning",
//             buttons: true,
//             dangerMode: true,
//           });
    
//           if (result) {
//             const response = await fetch('https://insurance-u3z5.onrender.com/logout', {
//               method: 'DELETE',
//               headers: {
//                 'Content-Type': 'application/json',
//               },
//             });
    
//             if (!response.ok) {
//               throw new Error('Logout failed');
//             }
    
//             setAdmin(null);
    
//             // Remove admin data from sessionStorage
//             localStorage.removeItem('jwtToken');  // Remove admin data from localStorage
//             // Navigate to "/"
//             return <Navigate to="/" />;
//           }
//         } catch (error) {
//           throw new Error('An error occurred during logout');
//         }
//       };







//   // Rehydrate admin state on component mount
//   useEffect(() => {
//     const storedToken = localStorage.getItem('jwtToken');
//     if (storedToken) {
//       setAdmin(decodeToken(storedToken));
//     }
//   }, []);

//   // Cleanup localStorage on component unmount
//   useEffect(() => {
//     return () => localStorage.removeItem('jwtToken');
//   }, []);

//   return (
//     <AuthContext.Provider value={{ admin, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   return useContext(AuthContext);
// };

// // Helper function to decode the JWT token
// const decodeToken = (token) => {
//   try {
//     const decoded = JSON.parse(atob(token.split('.')[1]));
//     return decoded;
//   } catch (error) {
//     return null;
//   }
// };
