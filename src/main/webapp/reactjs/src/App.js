import React, { Component } from "react";
import "./index.css";
import { Container, Row, Col } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavigationBar from "./Components/NavigationBar";
import Bienvenue from "./Components/Bienvenue";
import Voiture from "./Components/Voiture";
import VoitureListe from "./Components/VoitureListe";
import Footer from "./Components/Footer";

export default class App extends Component {
  render() {
    const marginTop = { marginTop: "20px" };
    return (
      <Router>
        <NavigationBar />
        <Container>
          <Row>
            <Col lg={12} style={marginTop}>
              <Routes>
                <Route path="/" element={<Bienvenue />} />
                <Route path="/add" element={<Voiture />} />
                <Route path="/list" element={<VoitureListe />} />
              </Routes>
            </Col>
          </Row>
        </Container>
        <Footer />
      </Router>
    );
  }
}

