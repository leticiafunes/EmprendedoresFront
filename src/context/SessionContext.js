import { createContext, useState } from "react";

const SessionContext = createContext();
const initialSession= {};

const SessionProvider = ({children}) => {

  const [session, setSession] = useState (initialSession);

  const handleSession = (user) => {

    setSession (user);
  
  }

  const closeSession = () => {

    setSession (initialSession);
  
  }

   const data = {session, handleSession, closeSession};

    return <SessionContext.Provider value= {data}>{children}</SessionContext.Provider>
}

export {SessionProvider};
export default SessionContext;



