import { Router } from 'express';
import { parseISO } from 'date-fns';
import AppointmentRepository from '../repositories/AppointmentRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';
import AppointmentController from '../controllers/AppointmentController';

const appointmentsRouter = Router();

const appointmentRepository = new AppointmentRepository();
const createAppointmentService = new CreateAppointmentService(
    appointmentRepository
);
const appointmentController = new AppointmentController({
    appointmentRepository,
    createAppointmentService,
});

appointmentsRouter.get('/', appointmentController.index);

appointmentsRouter.post('/', appointmentController.create);

export default appointmentsRouter;
