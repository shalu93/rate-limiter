import { Router } from 'express';
import express from 'express';

let notificationsPerClient = new Router();
// Essential globals
const app = express();
const router = express.Router();
const rateCheck = require('../../middlewares/ratelimiterPerMonth');

app.use(rateCheck);

router.get('/',(req,res) => {
  res.send('<h1>API response to check output of specific client throttling on per month basis</h1>')
})

notificationsPerClient.get('/',rateCheck,  router);

export default notificationsPerClient;