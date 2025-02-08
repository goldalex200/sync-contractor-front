import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext({
    user: null,
    setUser: () => {},
    isLoggedIn: false,
    setIsLoggedIn: () => {},
    logout: () => {},
});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('accessToken');
        if (storedUser && storedToken) {
            setUser(JSON.parse(storedUser));
            setIsLoggedIn(true);
        }
    }, []);

    const logout = () => {
        setUser(null);
        setIsLoggedIn(false);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
    };

    const value = { user, setUser, isLoggedIn, setIsLoggedIn, logout };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// export { AuthContext, AuthProvider };
// export { AuthProvider };
