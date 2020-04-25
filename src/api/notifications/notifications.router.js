import { Router } from 'express';
import { getnotifications } from './notifications.controller';

let notificationsRouter = new Router();

notificationsRouter.get('/', getnotifications);

export default notificationsRouter;
