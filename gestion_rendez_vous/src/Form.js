import React, { useState } from "react";
import axios from 'axios';

const AppointmentForm = ({ addAppointment }) => {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [hour, setHour] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/appointments', { name, date, hour })
     .then(response => {
        addAppointment(response.data);
        setName("");
        setDate("");
        setHour("");
      })
     .catch(error => console.error('Erreur:', error));
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-25">
		  <label htmlFor="fname">Nom complet</label>
		  </div>
            <div className="form-container">
              <input
                type="text"
                id="fname"
                name="firstname"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
        </div>
        <div className="row">
          <div className="col-25">
		  <label htmlFor="fname">Date de rendez-vous</label>
		  </div>
            <div className="form-container">
              <input
                type="date"
                id="date"
                name="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
        </div>
        <div className="row">
          <div className="col-25">
		  <label htmlFor="fname">Heure de rendez-vous</label>
		  </div>
            <div className="form-container">
              <input
                type="time"
                id="hour"
                name="hour"
                value={hour}
                onChange={(e) => setHour(e.target.value)}
                required
              />
            </div>
        </div>
        <div className="row">
          <input type="submit" value="Ajouter rendez-vous" />
        </div>
      </form>
    </div>
  );
};

export default AppointmentForm;