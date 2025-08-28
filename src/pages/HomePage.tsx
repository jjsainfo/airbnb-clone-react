import { use, useEffect } from "react";
import { SearchBar, PropertyGrid } from "../features/properties";
import { useAuth } from "../shared/hooks/UseAuth";
import OneSignal from "react-onesignal";



function HomePage() {

    useEffect(() => {
        OneSignal.init({
          appId: "f35241cf-4f85-422f-89c5-d5c46c18c73e",
          allowLocalhostAsSecureOrigin: true
        });
       // OneSignal.setConsentRequired(true);
      }, []);

      /*
      Para una push notificaction sin terceros
      Notification.requestPermission().then((permission) => {
        console.log(permission);
      });
      
      new Notification("title", {
        body: "body",
        icon: "icon.png",
      });*/ 
    

    const{login} = useAuth();
    const handleLogin = () => {
        login();        
    };


  
  return (
    <>
      <button onClick={handleLogin} className="btn btn-primary">Login</button>
      <SearchBar />
      <PropertyGrid />
    </>
  );
}   

export default HomePage;