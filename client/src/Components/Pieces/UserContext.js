import {createContext, useEffect, useState} from "react";
import axios from "axios";

//userContext to allow for versitle user is functions and state variables 
export const UserContext = createContext({});

function UserContextProvider({children}) {
    
    const [user, setUser] = useState(() => {
        // Initialize the user state with data from local storage if available
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    // Check if the user is logged in 
    useEffect(() => {
        if (!user) {
            axios.get('/profile', { withCredentials: true })
            .then(({data})=> {
                setUser(data);
                localStorage.setItem("user", JSON.stringify(data));
            })
        }}, [user]);

    return (
        <UserContext.Provider value={{user, setUser}} >
            { children }
        </UserContext.Provider>
    );
}

export default UserContextProvider;