import { Router } from 'express';
import multer from 'multer';
import UserController from '../controllers/UserController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import uploadConfig from '../config/upload';

const usersRouter = Router();

const userController = new UserController();

const upload = multer(uploadConfig);

usersRouter.post('/', userController.create);
usersRouter.patch(
    '/avatar',
    ensureAuthenticated,
    upload.single('avatar'),
    userController.updateAvatar
);

export default usersRouter;
