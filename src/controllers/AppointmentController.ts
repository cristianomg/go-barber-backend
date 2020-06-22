import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import CreateAppointmentService from '../services/CreateAppointmentService';
import AppointmentRepository from '../repositories/AppointmentRepository';

interface AppointmentControllerContructor {
    appointmentRepository: AppointmentRepository;
    createAppointmentService: CreateAppointmentService;
}

class AppointmentController {
    private createAppointmentService: CreateAppointmentService;

    private appointmentRepository: AppointmentRepository;

    constructor({
        appointmentRepository,
        createAppointmentService,
    }: AppointmentControllerContructor) {
        this.appointmentRepository = appointmentRepository;
        this.createAppointmentService = createAppointmentService;
    }

    public index(request: Request, response: Response): Response {
        const appointments = this.appointmentRepository.all();
        return response.json({
            result: appointments,
            count: appointments.length,
        });
    }

    public create(request: Request, response: Response): Response {
        const { provider, date } = request.body;
        const parsedDate = parseISO(date);
        try {
            const appointment = this.createAppointmentService.execute({
                provider,
                date: parsedDate,
            });
            return response.json(appointment);
        } catch (Error) {
            return response.status(400).json({ message: Error.message });
        }
    }
}

export default AppointmentController;
