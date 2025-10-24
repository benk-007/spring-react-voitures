// src/components/VoitureListe.jsx
import React, { useEffect, useState } from "react";
import { Card, Table, Button } from "react-bootstrap";
import api, { withAuth } from "../axios";
import VoitureForm from "./VoitureForm";

export default function VoitureListe() {
  const [voitures, setVoitures] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get("/voitures"); // baseURL=/api via proxy
      const list = Array.isArray(res.data) ? res.data : (res.data?._embedded?.voitures ?? []);
      setVoitures(list);
    } catch (e) {
      setError(e.response ? `Erreur serveur: ${e.response.status}` : "Erreur réseau");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const onCreate = async (payload) => {
    try {
      await api.post("/voitures", payload, withAuth());
      setModalOpen(false);
      await load();
    } catch (e) {
      setError(e.response ? `Erreur création: ${e.response.status}` : "Erreur réseau");
      console.error(e);
    }
  };

  const onUpdate = async (id, payload) => {
    try {
      await api.put(`/voitures/${id}`, payload, withAuth());
      setModalOpen(false);
      setEditing(null);
      await load();
    } catch (e) {
      setError(e.response ? `Erreur mise à jour: ${e.response.status}` : "Erreur réseau");
      console.error(e);
    }
  };

  const onDelete = async (id) => {
    if (!window.confirm("Supprimer cette voiture ?")) return;
    try {
      await api.delete(`/voitures/${id}`, withAuth());
      await load();
    } catch (e) {
      setError(e.response ? `Erreur suppression: ${e.response.status}` : "Erreur réseau");
      console.error(e);
    }
  };

  const openCreate = () => { setEditing(null); setModalOpen(true); };
  const openEdit = (v) => { setEditing(v); setModalOpen(true); };

  return (
    <>
      <Card className="border border-dark bg-dark text-white mt-3">
        <Card.Header className="d-flex justify-content-between align-items-center">
          <span>Liste des Voitures</span>
          <Button size="sm" variant="success" onClick={openCreate}>+ Ajouter</Button>
        </Card.Header>
        <Card.Body>
          {error && <div style={{ color: "salmon", marginBottom: 12 }}>Erreur: {error}</div>}
          {loading ? (
            <div>Chargement…</div>
          ) : (
            <Table bordered hover striped variant="dark">
              <thead>
                <tr>
                  <th>Marque</th>
                  <th>Modèle</th>
                  <th>Couleur</th>
                  <th>Année</th>
                  <th>Prix</th>
                  <th style={{ width: 140 }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {voitures.length === 0 ? (
                  <tr><td colSpan="6" align="center">Aucune voiture</td></tr>
                ) : voitures.map((v, idx) => (
                  <tr key={v.id ?? idx}>
                    <td>{v.marque}</td>
                    <td>{v.modele}</td>
                    <td>{v.couleur}</td>
                    <td>{v.annee}</td>
                    <td>{v.prix}</td>
                    <td>
                      <Button size="sm" variant="warning" className="me-2" onClick={() => openEdit(v)}>Modifier</Button>
                      <Button size="sm" variant="danger" onClick={() => onDelete(v.id)}>Supprimer</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>

      <VoitureForm
        show={modalOpen}
        onHide={() => { setModalOpen(false); setEditing(null); }}
        initial={editing}
        onSubmit={(data) => editing ? onUpdate(editing.id, data) : onCreate(data)}
      />
    </>
  );
}

