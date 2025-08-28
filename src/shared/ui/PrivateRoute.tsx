import type React from "react";

import { Navigate } from "react-router-dom";
import { useAuthContext } from "../hooks/AuthContext";
useAuthContext
interface PrivateRouteProps {
    children: React.ReactNode;
    roles?: string[] 
    fallbackPath?: React.ReactNode
}   

function PrivateRoute({children, roles, fallbackPath}: PrivateRouteProps ) {
    const{isAuthenticated,isLoading,login} = useAuthContext()

    if (isLoading) {
        return <div>Loading...</div>;
      }
    if(!isAuthenticated) {
       
        return(
            <div>
                <h1>No estas logueado</h1>
                <button onClick={login}> login </button>
            </div>
        )

        
    }
    
    
    return <>{children}</>;      

    

}


export default PrivateRoute