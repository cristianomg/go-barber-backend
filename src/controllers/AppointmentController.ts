import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import CreateAppointmentService from '../services/CreateAppointmentService';
import AppointmentRepository from '../repositories/AppointmentRepository';

class AppointmentController {
    public async index(
        request: Request,
        response: Response
    ): Promise<Response> {
        const appointmentRepository = getCustomRepository(
            AppointmentRepository
        );
        const appointments = await appointmentRepository.find();
        return response.json({
            result: appointments,
            count: appointments.length,
        });
    }

    public async create(
        request: Request,
        response: Response
    ): Promise<Response> {
        const { provider, date } = request.body;
        const parsedDate = parseISO(date);
        try {
            const createAppointmentService = new CreateAppointmentService();
            const appointment = await createAppointmentService.execute({
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
