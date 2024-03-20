import { createContext, useState } from "react";

export const FirebaseContext = createContext(null);
export const AuthContext = createContext(null);

// props nte ullile childrene destructure cheyth edknu
// passing setUser also because we need to change that user name for different users
export default function Context({children}) {
     const [user, setUser] = useState(null)
     return(
        <AuthContext.Provider value={{user , setUser}}> 
            {children}
        </AuthContext.Provider>
     )
}