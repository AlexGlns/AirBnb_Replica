import {createContext , useState, useEffect} from "react";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({children}) => {
    
    let [authTokens, setAuthTokens] = useState(null);
    let [user, setUser] = useState(null);

    let loginUser = async() => {

    }

    let contextData = {

    }
    
    return(
        <AuthContext.Provider value={{'name' :'Dennis'}}>
            {children}
        </AuthContext.Provider>
    )
}