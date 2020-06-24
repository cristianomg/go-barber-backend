import { Request, Response } from 'express';
import CreateUserService from '../services/CreateUserService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

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
            return response.status(err.statusCode).json({ error: err.message });
        }
    }

    public async updateAvatar(
        request: Request,
        response: Response
    ): Promise<Response> {
        try {
            const { id: user_id } = request.user;
            const avatarFilename = request.file.filename;
            const updateUserAvatar = new UpdateUserAvatarService();
            const user = await updateUserAvatar.execute({
                user_id,
                avatarFilename,
            });
            delete user.password;
            return response.status(200).json(user);
        } catch (err) {
            return response.status(err.statusCode).json({ error: err.message });
        }
    }
}
