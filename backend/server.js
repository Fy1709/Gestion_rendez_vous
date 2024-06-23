import express from 'express';
import cors from 'cors';
import appointmentRoutes from './routes/appointmentRoute.js';

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/appointments', appointmentRoutes);

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}`);
});