import React, { createContext, useState, useEffect, useMemo, useContext } from "react";
import { currentAuthenticatedUser, signOut } from "./AuthManager";

export const AuthDataContext = createContext(null);

interface IAuthData { id: Number, name: string, role: string };

const initialAuthData = {};

const AuthDataProvider = (props: any) => {
    const [authData, setAuthData] = useState<IAuthData | {}>(initialAuthData);

    /* The first time the component is rendered, it tries to
     * fetch the auth data from a source, like a cookie or
     * the localStorage.
     */
    useEffect(() => {
        currentAuthenticatedUser().then((currentAuthData: any) => {
            if (currentAuthData) {
                setAuthData(currentAuthData);
            }
        }).catch(() => console.log("user not loged in"))
    }, []);

    const onLogout = () => {
        console.log("user logout");
        signOut();
        setAuthData(initialAuthData)
    };

    const onLogin = (newAuthData: any) => {
        setAuthData(newAuthData)
    };
    const authDataValue = useMemo(() => {
        let authDataContextProperties = { user: authData, onLogin, onLogout };
        return authDataContextProperties
    }, [authData]);

    return <AuthDataContext.Provider value={authDataValue} {...props} />;
};

export const useAuthDataContext = () => useContext(AuthDataContext);

export default AuthDataProvider;