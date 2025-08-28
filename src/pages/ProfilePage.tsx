import { log } from "loglevel";
import { useAuthContext } from "../shared/hooks/AuthContext";
import { useEffect } from "react";


 
function ProfilePage() {
    const {user, logout} = useAuthContext();

    if(!user){
        return (
            <div>
                <h1>loading...</h1>
            </div>
        )
    }
   
    useEffect(() => {
            console.log(user)
    }, [user]);



    const formatClaim = (_key: string, value?: any) =>{
        if(typeof value === 'object' && value !== null) {
            return JSON.stringify(value);
        }
        if(typeof value === 'boolean') {
            return value ? 'true' : 'false';
        }
        if(typeof value === 'number') {
            return value.toString();
        }
        return String(value || '');
    }

    const checkUsername = () => {
        if(formatClaim(user?.profile?.username) == "admin") {
            return "admin";
        }
        return '';
    }


    return (
        <div>
            <h1>soy Profile page bienvenido: {user?.profile?.username}</h1>
            <button onClick={logout}>logout</button>
        </div>
    );
}    

export default ProfilePage