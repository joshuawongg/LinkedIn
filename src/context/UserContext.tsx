import { useUser } from "@clerk/clerk-expo";
import { createContext, useContext } from "react";

const UserContext = createContext({});

const UserContextProvider = ({ children }) => {
    const { user: authUser } = useUser();
 

    return (
        <UserContext.Provider value={{dbUser: null, authUser}} >
            {children}
        </UserContext.Provider>
    )
};

export default UserContextProvider; 
export const useUserContext = () => useContext(UserContext);
