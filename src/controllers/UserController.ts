import { Request, Response } from 'express';
import CreateUserService from '../services/CreateUserService';

export default class UserController {
    public async create(
        request: Request,
        response: Response
    ): Promise<Response> {
        try {
            const { name, email, password } = request.body;
            const createUserService = new CreateUserService();

            const user = await createUserService.execute({
                name,
                email,
                password,
            });

            delete user.password;

            return response.status(201).json(user);
        } catch (err) {
            return response.status(400).json({ error: err.message });
        }
    }
}
