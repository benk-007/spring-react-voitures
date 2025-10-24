import React from "react";
import { Toast, ToastContainer } from "react-bootstrap";

export default function MyToast({ show, message, bg = "success" }) {
  return (
    <ToastContainer position="top-center" className="p-3">
      <Toast show={show} bg={bg}>
        <Toast.Header closeButton={false}>
          <strong className="me-auto">Info</strong>
        </Toast.Header>
        <Toast.Body className="text-white">{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}

