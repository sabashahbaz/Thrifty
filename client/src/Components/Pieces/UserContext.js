import {createContext, useEffect, useState} from "react";
import axios from "axios";

export const UserContext = createContext({});

function UserContextProvider({children, currentUser, setCurrentUser}) {
    
    const [user, setUser] = useState(null);
    
    useEffect( () => {
        if (!user) {
            axios.get('/profile', {withCredentials: true})
            .then((response) => {
                console.log(response.data)
                setUser(response.data)
                })
        }});
    
        console.log("user",user);

            
            
    

    return (
        <UserContext.Provider value={{user, setUser}} >
            { children }
        </UserContext.Provider>
    );
}

export default UserContextProvider;