# Rate-limiter
Rate limiter on client notification clicks with throttling handled

# Description

Corporation X, Y, Z is a tech company that has launched a product called NotificationsMailer that provides a notification service for sending SMS and E-mail notifications. They are selling this service to different clients and each client has specific limits on the number of requests they can send in a month.
Because they are a startup they have a limited amount of infrastructure to serve all clients at peak capacity because their solution has been very successful. Each client has the ability to pay for more requests per second.
The company is seeing performance issues on their API because they haven't implemented the limits that have been set out in the software.
The design problem is how should they try to solve these three issues :
 1. Too many requests within the same time window from a client
 2. Too many requests from a specific client on a per month basis
 3. Too many requests across the entire system.

Please copy and paste the .env-example and change it to .env to proceed


## Documentation
| Methods | Endpoints | Actions |
| :----- | :----- | ----- |
| /GET | /notifications | Too many requests across System |
| /GET | /api/notifications/sametime | Request in particular time interval |
| /GET | /api/notifications/client | Specific client request on per month basis |


# Setting up Dev

## Clone the Repository to your local machine <br/>
```
git clone https://github.com/shalu93/rate-limiter.git
``` 

## Install dependencies <br/>
``` 
npm install
```

## Starting development server <br/> 
``` 
npm run dev
```

## Run Tests <br/>
```
npm run test
```

## Deployment
```
The folder structure is very simple it will give an idea about what to add where.
```