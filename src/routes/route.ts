import {Router, Request, Response} from 'express'
import { controller } from '../controller/usercontroller'
import { middleware } from '../middleware/verifyToken';

const route = Router();

route.post('/signup',controller.signUp);
route.post('/signin',controller.signIn);
route.get('/:id',middleware.verifyToken,  controller.getUserSystem)

export {route}