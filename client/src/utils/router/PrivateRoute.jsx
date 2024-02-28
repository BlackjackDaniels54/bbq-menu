import { Navigate, Outlet } from "react-router-dom";

function Privat() {
  let auth = false;
  return(
    auth ? <Outlet/> : <Navigate to="login"/>
  )
}

export default Privat;