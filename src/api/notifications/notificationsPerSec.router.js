import { Router } from 'express';
import express from 'express';

let notificationsPerSecRouter = new Router();
// Essential globals
const app = express();
const router = express.Router();
const rateCheck = require('../../middlewares/ratelimiterperclient');

app.use(rateCheck);

router.get('/',(req,res) => {
  res.send('<h1>API response to check output within sametime window from clients</h1>')
})

notificationsPerSecRouter.get('/',rateCheck,  router);

export default notificationsPerSecRouter;