import React from "react";
import { Jumbotron, Container } from "react-bootstrap";

// React-Bootstrap v2 uses <Container> and utility classes; Jumbotron was renamed.
// We'll emulate the TP look with a styled div.
export default class Bienvenue extends React.Component {
  render() {
    return (
      <div className="p-5 mb-4 bg-dark text-white rounded-3">
        <Container fluid>
          <h1>Bienvenue au Magasin des Voitures</h1>
          <blockquote className="blockquote mb-0">
            <p>Le meilleur de nos voitures est exposé près de chez vous</p>
            <footer className="blockquote-footer text-white-50">Master MIOLA</footer>
          </blockquote>
        </Container>
      </div>
    );
  }
}

