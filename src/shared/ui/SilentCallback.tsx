import { useEffect } from "react"
import { useAuth } from "../hooks/UseAuth"
import { useAuth as useAuthContext } from "react-oidc-context";

const SilentCallback = () => {
    //const auth = useAuth();
    const auth = useAuthContext();
useEffect(() => {
    if(auth.isAuthenticated) {
        localStorage.setItem('access_token',
            String(auth.user?.access_token) || '');
    }   
},[auth])

    return(
        <div>SilentCalback</div>

    )
}

export default SilentCallback
