import React, { Component } from "react";
import { Card, Form, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import MyToast from "./MyToast";

export default class Voiture extends Component {
  constructor(props) {
    super(props);
    this.state = {
      marque: "",
      modele: "",
      couleur: "",
      immatricule: "",
      annee: "",
      prix: "",
      show: false,
      toastBg: "success",
      toastMsg: ""
    };
    this.voitureChange = this.voitureChange.bind(this);
    this.submitVoiture = this.submitVoiture.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  voitureChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  resetForm() {
    this.setState({
      marque: "",
      modele: "",
      couleur: "",
      immatricule: "",
      annee: "",
      prix: ""
    });
  }

  async submitVoiture(e) {
    e.preventDefault();
    try {
      // Using /api/voitures (Spring Data REST, per TP)
      const payload = {
        marque: this.state.marque,
        modele: this.state.modele,
        couleur: this.state.couleur,
        immatricule: this.state.immatricule,
        annee: Number(this.state.annee),
        prix: Number(this.state.prix)
      };
      await axios.post("http://localhost:8080/api/voitures", payload, {
        auth: { username: "user", password: "pass" }
      });
      this.setState({ show: true, toastBg: "success", toastMsg: "Voiture enregistrée avec succès." });
      setTimeout(() => this.setState({ show: false }), 3000);
      this.resetForm();
    } catch (err) {
      this.setState({ show: true, toastBg: "danger", toastMsg: "Erreur lors de l'enregistrement." });
      setTimeout(() => this.setState({ show: false }), 3000);
    }
  }

  render() {
    return (
      <>
        <div style={{ display: this.state.show ? "block" : "none" }}>
          <MyToast show={this.state.show} message={this.state.toastMsg} bg={this.state.toastBg} />
        </div>

        <Card className="border border-dark bg-dark text-white">
          <Card.Header>Ajouter Voiture</Card.Header>
          <Form onSubmit={this.submitVoiture} onReset={this.resetForm} id="VoitureFormId">
            <Card.Body>
              <Row>
                <Form.Group as={Col} controlId="formGridMarque">
                  <Form.Label>Marque</Form.Label>
                  <Form.Control
                    required name="marque" type="text"
                    className="bg-dark text-white"
                    value={this.state.marque}
                    autoComplete="off"
                    placeholder="Entrez Marque Voiture"
                    onChange={this.voitureChange}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridModele">
                  <Form.Label>Modèle</Form.Label>
                  <Form.Control
                    required name="modele" type="text"
                    className="bg-dark text-white"
                    value={this.state.modele}
                    autoComplete="off"
                    placeholder="Entrez Modèle"
                    onChange={this.voitureChange}
                  />
                </Form.Group>
              </Row>

              <Row className="mt-3">
                <Form.Group as={Col} controlId="formGridCouleur">
                  <Form.Label>Couleur</Form.Label>
                  <Form.Control
                    required name="couleur" type="text"
                    className="bg-dark text-white"
                    value={this.state.couleur}
                    autoComplete="off"
                    placeholder="Entrez Couleur"
                    onChange={this.voitureChange}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridImmat">
                  <Form.Label>Immatricule</Form.Label>
                  <Form.Control
                    required name="immatricule" type="text"
                    className="bg-dark text-white"
                    value={this.state.immatricule}
                    autoComplete="off"
                    placeholder="Ex: A-1-9090"
                    onChange={this.voitureChange}
                  />
                </Form.Group>
              </Row>

              <Row className="mt-3">
                <Form.Group as={Col} controlId="formGridAnnee">
                  <Form.Label>Année</Form.Label>
                  <Form.Control
                    required name="annee" type="number"
                    className="bg-dark text-white"
                    value={this.state.annee}
                    autoComplete="off"
                    placeholder="Ex: 2018"
                    onChange={this.voitureChange}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPrix">
                  <Form.Label>Prix</Form.Label>
                  <Form.Control
                    required name="prix" type="number"
                    className="bg-dark text-white"
                    value={this.state.prix}
                    autoComplete="off"
                    placeholder="Ex: 95000"
                    onChange={this.voitureChange}
                  />
                </Form.Group>
              </Row>
            </Card.Body>

            <Card.Footer style={{ textAlign: "right" }}>
              <Button size="sm" variant="success" type="submit" className="me-2">Submit</Button>
              <Button size="sm" variant="outline-info" type="reset">Reset</Button>
            </Card.Footer>
          </Form>
        </Card>
      </>
    );
  }
}

