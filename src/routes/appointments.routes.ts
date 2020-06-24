import { Router } from 'express';
import AppointmentController from '../controllers/AppointmentController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const appointmentsRouter = Router();
const appointmentController = new AppointmentController();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/', appointmentController.index);

appointmentsRouter.post('/', appointmentController.create);

export default appointmentsRouter;
