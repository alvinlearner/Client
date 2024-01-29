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
