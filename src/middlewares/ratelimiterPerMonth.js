const redis = require('redis')
const redisClientLimit = redis.createClient()
const moment = require('moment')
const RATE_LIMIT_PER_MONTH = 12;

module.exports = (req,res,next) => {
  redisClientLimit.exists(req.headers.user,(err,reply) => {
    if(err) {
      console.log("Redis not working...")
      system.exit(0)
    }
    if(reply === 1) {
      // user exists
      // check time interval
      redisClientLimit.get(req.headers.user,(err,reply) => {
        let data = JSON.parse(reply)
        let currentTime = moment().unix()
        let difference = (currentTime - data.startTime)/2592000 
        console.log('difference:',difference, 'datacount',data.count  );
        if(difference >= 1) {
          let body = {
            'count': 1,
            'startTime': moment().unix()
          }
          redisClientLimit.set(req.headers.user,JSON.stringify(body))
          // allow the request
          next()
        }
        if(difference < 1) {
          if(data.count > RATE_LIMIT_PER_MONTH) {
            return res.json({"error": 1, 
            "message": `Notification limit exceeded for ${req.headers.user} client... you are allowed ${RATE_LIMIT_PER_MONTH} requests per Month, Please contact X,Y,Z Company to increase the limit`})
          }
          // update the count and allow the request
          data.count++;
          redisClientLimit.set(req.headers.user,JSON.stringify(data))
          // allow request
          next()
        }
      })
    } else {
      // add new user
      let body = {
        'count': 1,
        'startTime': moment().unix()
      }
      redisClientLimit.set(req.headers.user,JSON.stringify(body))
      // allow request
      next()
    }
  })
}