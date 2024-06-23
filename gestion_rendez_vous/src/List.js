
import React, { useEffect, useState } from "react";
import axios from 'axios';
import moment from 'moment';



const AppointmentList = () => {
	const [appointments, setAppointments] = useState([]);
	const [editedIndex, setEditedIndex] = useState(null);
	const [editedName, setEditedName] = useState("");
	const [editedDate, setEditedDate] = useState("");
	const [editedHour, setEditedHour] = useState("");

	useEffect(() => {
		axios.get('http://localhost:5000/appointments')
			.then(response => {
			setAppointments(response.data);
			})
			.catch(error => console.error('Erreur:', error));
	}, [setAppointments]);

	const handleEdit = (index) => {
		setEditedIndex(index);
		setEditedName(appointments[index].name);
		setEditedDate(appointments[index].date);
		setEditedHour(appointments[index].hour);
	};

	const handleSaveEdit = (index) => {
		const appointment = appointments[index];
		axios.put(`http://localhost:5000/appointments/${appointment.idclient}`, { name: editedName, date: editedDate, hour:editedHour })
			.then(() => {
				const updatedAppointments = [...appointments];
				updatedAppointments[index] = { ...updatedAppointments[index], name: editedName, date: editedDate, hour: editedHour };
				setAppointments(updatedAppointments);
				setEditedIndex(null);
				setEditedName("");
				setEditedDate("");
				setEditedHour("");
			})
			.catch(error => console.error('Erreur:', error));
	};

	const handleDelete = (index) => {
		const appointment = appointments[index];
		axios.delete(`http://localhost:5000/appointments/${appointment.idclient}`)
			.then(() => {
				setAppointments(appointments.filter((_, i) => i !== index));
			})
			.catch(error => console.error('Erreur:', error));
	}

	return (
		<div className="container">
			<h1>Liste des rendez-vous</h1>
			<table id="list">
				<thead>
					<tr>
						<th>ID</th>
						<th>Nom</th>
						<th>Date</th>
						<th>Heure</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{appointments.map((appointment, index) => (
						<tr key={index}>
							<td>{appointment.idclient}</td>
							<td>
								{editedIndex === index ? (
									<input
										type="text"
										value={editedName}
										onChange={(e) => setEditedName(e.target.value)}
									/>
								) : (
									appointment.name
								)}
							</td>
							<td>
								{editedIndex === index ? (
									<input
										type="date"
										value={editedDate}
										onChange={(e) => setEditedDate(e.target.value)}
									/>
								) : (
									moment(appointment.date).format('DD/MM/YYYY')
									)}
							</td>
							<td>
								{editedIndex === index ? (
									<input
										type="time"
										value={editedHour}
										onChange={(e) => setEditedHour(e.target.value)}
									/>
								) : (
									appointment.hour
								)}
							</td>
							<td>
								{editedIndex === index ? (
									<>
										<button onClick={() => handleSaveEdit(index)}>Enregistrer</button>
										<button onClick={() => setEditedIndex(null)}>Annuler</button>
									</>
								) : (
									<>
										<button onClick={() => handleEdit(index)}>Modifier</button>
										<button onClick={() => handleDelete(index)}>Supprimer</button>
									</>
								)}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default AppointmentList;
