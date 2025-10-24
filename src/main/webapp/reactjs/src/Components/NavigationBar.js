import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export default class NavigationBar extends React.Component {
  render() {
    return (
      <Navbar bg="dark" variant="dark">
        <Link to="/" className="navbar-brand">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/1/17/Tata_Tamo_Racemo.jpg"
            width="25"
            height="25"
            alt="logo"
          />
        </Link>
        <Nav className="me-auto">
          <Link to="/add" className="nav-link">Ajouter Voiture</Link>
          <Link to="/list" className="nav-link">Liste Voitures</Link>
        </Nav>
      </Navbar>
    );
  }
}

