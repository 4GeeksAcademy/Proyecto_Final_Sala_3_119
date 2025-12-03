import React, { useState } from "react";
import { Form, Spinner } from "react-bootstrap";
import { sports } from "../jsApiComponents/sports";
import { toast } from "react-toastify"; 

export const CreateActivityPopup = ({ show, onActivityCreated, coordinates }) => {
  const [formData, setFormData] = useState({
    name: "",
    sport: "",
    description: "",
    max_participants: "",
    date: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;
  const getCurrentDateTimeLocal = () => {
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset()); 
  return now.toISOString().slice(0,16); 
};



  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      sport: "",
      description: "",
      max_participants: "",
      date: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!coordinates) {
      toast.warning("⚠️ Debes seleccionar una ubicación en el mapa");
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("JWT-STORAGE-KEY");
      const bodyWithCoords = {
        ...formData,
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
      };


      const resp = await fetch(`${BASE_URL}api/activities`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bodyWithCoords),
      });

      if (!resp.ok) {
        const err = await resp.json();
        console.error("SERVER ERROR 422 ==> ", err);
        toast.error(err.error || "🚫 Error creando actividad");
        setLoading(false);
        return; 
      }

      const data = await resp.json();
      onActivityCreated(data);
      toast.success("🎉 Actividad creada correctamente!");

      window.dispatchEvent(new Event("activities-updated"));
      resetForm();

    } catch (err) {
      toast.error("⚠️ Error interno del servidor");
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;




  return (
    <div className="footer-cta footer-cta--stable newsletter-form w-100 mx-auto">
      <h2 className="mb-3" style={{ color: "#E3FE18" }}>
        Crear actividad deportiva
      </h2>

      <Form onSubmit={handleSubmit} className="w-100">

        <Form.Group className="mb-2 newsletter-form w-100">
          <Form.Control
            type="text"
            name="name"
            placeholder="Título de la actividad"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-2 newsletter-form w-100">
          <Form.Select name="sport" value={formData.sport} onChange={handleChange} required>
            <option value="">Seleccionar deporte...</option>
            {sports.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-2 newsletter-form w-100">
          <Form.Control
            as="textarea"
            name="description"
            placeholder="Describe la actividad"
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-2 newsletter-form w-100">
          <Form.Control
            name="max_participants"
            type="number"
            min="1"
            placeholder="Máx. participantes"
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-2 newsletter-form w-100">
          <Form.Control
            type="datetime-local"
            min={getCurrentDateTimeLocal()}
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <div className="p-2 bg-transparent rounded text-light mb-2 w-100 text-center">
          {coordinates
            ? `📍 Lat: ${coordinates.latitude.toFixed(5)}, Lng: ${coordinates.longitude.toFixed(5)}`
            : "Haz clic en el mapa para marcar la ubicación"}
        </div>

        {error && <p className="text-danger w-100 text-center">{error}</p>}

        <div className="newsletter-form mt-3 w-100 d-flex justify-content-center">
          <button type="submit" disabled={loading || !coordinates} className="neon-create-btn">
            {loading ? <Spinner size="sm" /> : "Crear actividad"}
          </button>
        </div>
      </Form>
    </div>
  );
};