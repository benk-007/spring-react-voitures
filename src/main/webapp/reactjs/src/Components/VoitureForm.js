import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";

export default function VoitureForm({ show, onHide, initial, onSubmit }) {
  const [form, setForm] = useState({
    marque: "", modele: "", couleur: "",
    immatricule: "", annee: 0, prix: 0,
  });

  useEffect(() => {
    setForm(initial ?? { marque:"", modele:"", couleur:"", immatricule:"", annee:0, prix:0 });
  }, [initial]);

  const handle = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      annee: Number(form.annee || 0),
      prix: Number(form.prix || 0),
    };
    onSubmit(payload);
  };

  return (
    <Modal show={show} onHide={onHide} backdrop="static">
      <Form onSubmit={submit}>
        <Modal.Header closeButton>
          <Modal.Title>{initial?.id ? "Modifier Voiture" : "Ajouter Voiture"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-2">
            <Form.Label>Marque</Form.Label>
            <Form.Control name="marque" value={form.marque} onChange={handle} required />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Modèle</Form.Label>
            <Form.Control name="modele" value={form.modele} onChange={handle} required />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Couleur</Form.Label>
            <Form.Control name="couleur" value={form.couleur} onChange={handle} />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Immatricule</Form.Label>
            <Form.Control name="immatricule" value={form.immatricule} onChange={handle} />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Année</Form.Label>
            <Form.Control type="number" name="annee" value={form.annee} onChange={handle} />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Prix</Form.Label>
            <Form.Control type="number" name="prix" value={form.prix} onChange={handle} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>Annuler</Button>
          <Button type="submit" variant="primary">Enregistrer</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

