import { Router } from 'express';
import AppointmentController from '../controllers/AppointmentController';

const appointmentsRouter = Router();
const appointmentController = new AppointmentController();

appointmentsRouter.get('/', appointmentController.index);

appointmentsRouter.post('/', appointmentController.create);

export default appointmentsRouter;
