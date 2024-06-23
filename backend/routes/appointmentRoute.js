import express from 'express';
import * as appointmentController from '../controllers/appointmentControllers.js';

const router = express.Router();

router.get('/', appointmentController.getAppointments);
router.post('/', appointmentController.createAppointment);
router.put('/:id', appointmentController.updateAppointment);
router.delete('/:id', appointmentController.deleteAppointment);

export default router;