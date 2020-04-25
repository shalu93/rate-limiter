const redis = require('redis')
const redisClient = redis.createClient()
const moment = require('moment')

module.exports = (req,res,next) => {
  redisClient.exists(req.headers.user,(err,reply) => {
    if(err) {
      console.log("Redis not working...")
      system.exit(0)
    }
    if(reply === 1) {
      // user exists
      // check time interval
      redisClient.get(req.headers.user,(err,reply) => {
        let data = JSON.parse(reply)
        let currentTime = moment().unix()
        let difference = (currentTime - data.startTime)/60
        console.log('current time:',currentTime, 'data start time', data.startTime);
        if(difference >= 1) {
          let body = {
            'count': 1,
            'startTime': moment().unix()
          }
          redisClient.set(req.headers.user,JSON.stringify(body))
          // allow the request
          next()
        }
        if(difference < 1) {
          if(data.count > 4) {
            return res.json({"error": 1, 
            "message": `Notification limit exceeded for ${req.headers.user} client... you are allowed only 5 requests per minute, Please contact X,Y,Z Company to increase the limit`})
          }
          // update the count and allow the request
          data.count++
          redisClient.set(req.headers.user,JSON.stringify(data))
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
      redisClient.set(req.headers.user,JSON.stringify(body))
      // allow request
      next()
    }
  })
}