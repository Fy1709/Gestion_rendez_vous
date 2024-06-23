import * as appointmentModel from '../models/appointmentModels.js';



export const getAppointments = async (req, res) => {
    try {
        const appointments = await appointmentModel.getAllAppointments();
        res.json(appointments);
    } catch (err) {
        console.error('Erreur:', err);
        res.status(500).json({ error: 'Erreur lors de la récupération des rendez-vous' });
    }
};

export const createAppointment = async (req, res) => {
    const { name, date, hour } = req.body;
    try {
        const id = await appointmentModel.createAppointment(name, date, hour);
        res.json({ id, name, date, hour });
    } catch (err) {
        console.error('Erreur:', err);
        res.status(500).json({ error: 'Erreur lors de l\'ajout du rendez-vous' });
    }
};

export const updateAppointment = async (req, res) => {
    const { id } = req.params;
    const { name, date, hour } = req.body;
    try {
        await appointmentModel.updateAppointment(id, name, date, hour);
        res.json({ message: 'Rendez-vous mis à jour avec succès' });
    } catch (err) {
        console.error('Erreur:', err);
        res.status(500).json({ error: 'Erreur lors de la mise à jour du rendez-vous' });
    }
};

export const deleteAppointment = async (req, res) => {
    const { id } = req.params;
    try {
        await appointmentModel.deleteAppointment(id);
        res.json({ message: 'Rendez-vous supprimé avec succès' });
    } catch (err) {
        console.error('Erreur:', err);
        res.status(500).json({ error: 'Erreur lors de la suppression du rendez-vous' });
    }
};