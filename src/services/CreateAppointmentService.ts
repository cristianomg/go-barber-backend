import { startOfHour } from 'date-fns';
import { getCustomRepository, getRepository } from 'typeorm';
import AppointmentRepository from '../repositories/AppointmentRepository';
import Appointment from '../models/Appointment';
import User from '../models/User';

interface Request {
    provider_id: string;
    date: Date;
}

class CreateAppointmentService {
    public async execute({ provider_id, date }: Request): Promise<Appointment> {
        const appointmentRepository = getCustomRepository(
            AppointmentRepository
        );
        const usersRepository = getRepository(User);

        const appointmentDate = startOfHour(date);

        const findAppointmentInSameDate = await appointmentRepository.findByDate(
            appointmentDate
        );

        if (
            findAppointmentInSameDate &&
            findAppointmentInSameDate.provider_id === provider_id
        ) {
            throw new Error('This appointment is already booked');
        }

        const checkUserExists = await usersRepository.findOne({
            where: { id: provider_id },
        });

        if (!checkUserExists) throw new Error('This provider not exists.');

        const appointment = appointmentRepository.create({
            provider_id,
            date: appointmentDate,
        });

        await appointmentRepository.save(appointment);

        return appointment;
    }
}

export default CreateAppointmentService;
