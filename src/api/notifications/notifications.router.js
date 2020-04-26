import { Router } from 'express';
import { getnotifications } from './notifications.controller';
import { customRedisRateLimiter } from '../../middlewares'

let notificationsRouter = new Router();

notificationsRouter.get('/', customRedisRateLimiter, getnotifications);

export default notificationsRouter;
