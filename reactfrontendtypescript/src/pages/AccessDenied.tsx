import React from 'react'
import AppNavbar from "../components/AppNavbar";
import {Container} from "reactstrap";
import imageNoAccess from "../images/NoAccess.png";
import {useLocation} from "react-router-dom";

function AccessDenied() {
  let location = useLocation();
  return (
  <div>
    <AppNavbar/>
    <Container fluid className="align-content-center text-center">
      <br/>
      <img src={imageNoAccess} alt="Нет доступа"/>
      <br/><br/>
      <h4>У вас нет разрешения на просмотр страницы "<b style={{color: "red"}}>{location.pathname}</b>". </h4>
    </Container>
  </div>
  );
}

export default AccessDenied
