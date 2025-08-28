import { useNavigate } from "react-router-dom";
import { useAuth } from "react-oidc-context";
import { useEffect } from "react";

const AuthCallback = () => {
    const navigate = useNavigate();
    const auth = useAuth();

    useEffect(() => {
       if(auth.isAuthenticated) {
        localStorage.setItem('access_token',String(auth.user?.access_token) || '');
        navigate('/profile', { replace: true });
       }
    }, [auth.isAuthenticated, navigate]);

    useEffect(() => {
        if(auth.error) {
            navigate('/', { replace: true });
        }
    }, [auth.error, navigate]);

    return(
        <div>
            <h1>processing authentication</h1>
        </div>
    )
}

export default AuthCallback