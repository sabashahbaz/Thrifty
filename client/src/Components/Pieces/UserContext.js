import {createContext, useEffect, useState} from "react";
import axios from "axios";

export const UserContext = createContext({});

function UserContextProvider({children, currentUser, setCurrentUser}) {
    
    const [user, setUser] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);
    
    // useEffect( () => {
    //     if (!user) {
    //         axios.get('/profile', {withCredentials: true})
    //         .then((response) => {
    //             // console.log(response.data)
    //             setUser(response.data)
    //             setLoggedIn(true)
    //             })
    //     }});

    useEffect(() => {
        // Check if the user is logged in by making a request to the /profile endpoint
        axios.get('/profile', { withCredentials: true })
            .then((response) => {
                if (response.data) {
                    // User data exists, set the user and mark as logged in
                    setUser(response.data);
                    setLoggedIn(true);
                } else {
                    // No user data in the response, indicating a logged-out state
                    setUser(null); // Set user to null
                    setLoggedIn(false); // Mark as logged out
                }
            })
            .catch((error) => {
                // Handle any errors, you can add error handling logic here
                console.error('Error fetching user profile:', error);
            });
    }, []);
    
        // console.log("user",user);

            
            
    

    return (
        <UserContext.Provider value={{user, setUser, loggedIn}} >
            { children }
        </UserContext.Provider>
    );
}

export default UserContextProvider;