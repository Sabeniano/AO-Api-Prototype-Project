<h1 align="center">
  Administrative Organizer
  <br>
  API - Userguide
  <br>
</h1>

<p align="center">
  <a href="#getting-started">Getting Started</a> •
  <a href="#query-parameters">Query Parameters</a> •
  <a href="#http-verbs">HTTP Verbs</a> •
  <a href="#status-codes">Status Codes</a> •
  <a href="#hateoas">Hateoas</a> •
  <a href="#example-parameters">Example Parameters</a> •
  <a href="#authors">Authors</a>
</p>

<h3 align="center">
  Navigate through Example Parameters
</h3>

<p align="center">
  <a href="#auth">Auth</a> •
  <a href="#user">User</a> •
  <a href="#employee">Employee</a> •
  <a href="#job">Job</a> •
  <a href="#schedule">Schedule</a> •
  <a href="#wallet">Wallet</a> •
  <a href="#workhours">Workhours</a>
</p>

## Getting Started
## Query Parameters
## HTTP Verbs
| Verb | Description |
|:----:|-------------|
| <code>GET</code> | Used for retrieving resources.|
| <code>POST</code> | Used for creating resources.  |
| <code>PATCH</code> |	Used for updating resources with partial JSON data. For instance, an Issue resource has title and body attributes. A PATCH request may accept one or more of the attributes to update the resource. PATCH is a relatively new and uncommon HTTP verb, so resource endpoints also accept POST requests.   |
| <code>DELETE</code> | Used for deleting resources.  |
## Status Codes
| Status Code | Status | Description |
|:-----------:|:------:|-------------|
| <code>200</code> | OK | Standard response for successful HTTP requests. |
| <code>201</code> | Created | The request has been fulfilled, resulting in the creation of a new resource. |
| <code>401</code> | Unauthorized | Similar to 403 Forbidden, but specifically for use when authentication is required and has failed or has not yet been provided. |
| <code>404</code> | Not Found | The requested resource could not be found but may be available in the future. |
| <code>405</code> | Method Not Allowed | A request method is not supported for the requested resource; for example, a GET request on a form that requires data to be presented via POST, or a PUT request on a read-only resource. |
| <code>409</code> | Conflict | Indicates that the request could not be processed because of conflict in the current state of the resource, such as an edit conflict between multiple simultaneous updates. |
| <code>422</code> | Unprocessable Entity | The request was well-formed but was unable to be followed due to semantic errors. |
| <code>500</code> | Internal Server Error | A generic error message, given when an unexpected condition was encountered and no more specific message is suitable. |
## Hateoas
## Example Parameters
<p align="center">
  <a href="#auth">Auth</a> •
  <a href="#user">User</a> •
  <a href="#employee">Employee</a> •
  <a href="#job">Job</a> •
  <a href="#schedule">Schedule</a> •
  <a href="#wallet">Wallet</a> •
  <a href="#workhours">Workhours</a>
</p>

- This section will show you how to format your JSON, what values to insert and expect.

- In some examples you will see ```"Links": [...]``` in *[Response]*, please see <a href="#hateoas">Hateoas</a> for references.

- **NOTICE: Creating a employee through /api/v1/employee will automatically create a user account, but creating a user through /api/v1/users or /api/v1/auth/signup will not make you an employee.**
### Auth
*[Request]* **<code>POST</code> /api/v1/auth/signup**
```
http://localhost:3000/api/v1/auth/signup
{
  "username": "john",
  "password": "Gesdf144!" (minimum 5 characters, 1 capital letter, 1 symbol),
  "email": "johndoe@email.com",
  "role": "employee"
}
```
*[Response]* 201 Created
```
{
  "status": 201,
  "message": "User succesfully created"
}
``` 
___
*[Request]* **<code>POST</code> /api/v1/auth/signin**
```
http://localhost:3000/api/v1/auth/signin
{
  "username": "john",
  "password": "Gesdf144!"
}
```
*[Response]* 200 OK
```
{
  "status": 200,
  "message": "Auth successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpX3CJ9.eyJfaWQiOiI1Yjk3Nj30ZGU1NTY3YTJiMzgyOGRiYjMiLCJpYXQiOjE1M3Y2NTY4MzYsImV4cCI6MTUzNj32MDQzNn0.rpdiBw5K6gGua6m_SlKxg3DFmQeNsFnk6-77YVb4-qP"
}
```
___
*[Request]* **<code>GET</code> /api/v1/auth/me**
```
http://localhost:3000/api/v1/auth/me
```
*[Response]* 200 OK
```
{
  "role": "employee",
  "_id": "5b965da7e8378620b44bf852",
  "username": "john",
  "email": "johndoe@email.com",
  "links": [...]
}
```
___
*[Request]* **<code>PATCH</code> /api/v1/auth/me**
```
http://localhost:3000/api/v1/auth/me
{
  "role": "employee",
  "username": "john",
  "password": "Gesdf144!" (minimum 5 characters, 1 capital letter, 1 symbol),
  "email": "johndoe@email.com"
}
```
*[Response]* 200 OK
```
{
  "_id": "5b965da7e8378620b44bf852",
  "username": "john",
  "email": "johndoe@email.com",
  "links": [...]
}
```
___
*[Request]* **<code>DELETE</code> /api/v1/auth/me**
```
http://localhost:3000/api/v1/auth/me
```
*[Response]* 200 OK
```
{
  "status": 200,
  "message": "Successfully deleted user"
}
```
___
### User
*[Request]* **<code>GET</code> /api/v1/users/**
```
http://localhost:3000/api/v1/users
```
*[Response]* 200 OK
```
{
  "count": 50,
  "users": [
    {
      "_id": "5b965da7e8378620b44bf852",
      "username": "john",
      "email": "johndoe@email.com",
      "employee": "5b965da7e8378620b44bf85z" (employee collection will only be there if user is created through /api/v1/employee),
      "links": [...]
    },
    ...
  ]
}
```
___
*[Request]* **<code>POST</code> /api/v1/users/**
```
http://localhost:3000/api/v1/users
{
  "username": "john",
  "password": "Gesdf144!" (minimum 5 characters, 1 capital letter, 1 symbol),
  "email": "johndoe@email.com",
  "role": "employee"
}
```
*[Response]* 201 Created
```
{
  "role": "employee",
  "_id": "5b965da7e8378620b44bf852",
  "username": "john",
  "email": "johndoe@email.com",
  "links": [...]
}
```
___
*[Request]* **<code>GET</code> /api/v1/users/:id**
```
http://localhost:3000/api/v1/users/5b965da7e8378620b44bf852
```
*[Response]* 200 OK
```
{
  "role": "employee",
  "_id": "5b965da7e8378620b44bf852",
  "username": "john",
  "email": "johndoe@email.com",
  "employee": {
    "_id": "5b965da7e8378620b44bf85z",
    "firstName": "john",
    "lastName": "doe",
    "email": "johndoe@email.com",
    "phoneNumber": 54512054,
    "links": [...]
  },
  "links": [...]
}
```
___
*[Request]* **<code>PATCH</code> /api/v1/users/:id**
```
http://localhost:3000/api/v1/users/5b965da7e8378620b44bf852
{
  "role": "employee",
  "username": "john",
  "password": "Gesdf144!"(minimum 5 characters, 1 capital letter, 1 symbol),
  "email": "johndoe@email.com"
}
```
*[Response]* 200 OK
```
{
  "_id": "5b965da7e8378620b44bf852",
  "username": "john",
  "email": "johndoe@email.com",
  "links": [...]
}
```
___
*[Request]* **<code>DELETE</code> /api/v1/users/:id**
```
http://localhost:3000/api/v1/users/5b965da7e8378620b44bf852
```
*[Response]* 200 OK
```
{
  "status": 200,
  "message": "Successfully deleted user"
}
```
___
### Employee
*[Request]* **<code>GET</code> /api/v1/employee/**
```
http://localhost:3000/api/v1/employee
```
*[Response]* 200 OK
```
{
  "count": 50,
  "employees": [
    {
      "_id": "5b965da7e8378620b44bf85z",
      "firstName": "john",
      "lastName": "doe",
      "phoneNumber": 54512054,
      "links": [...]
    },
    ...
  ]
}
```
___

*[Request]* **<code>POST</code> /api/v1/employee/**
```
http://localhost:3000/api/v1/employee
{
  "firstName": "john",
  "lastName": "doe",
  "email": "johndoe@email.com",
  "birthday": "1990-01-01",
  "city": "copenhagen",
  "country": "denmark",
  "street": "telegrafvej 9",
  "phoneNumber": 54512054,
  "startDate": "2018-01-01"
}

```
*[Response]* 201 Created
```
{
  "_id": "5b965da7e8378620b44bf85z",
  "firstName": "john",
  "lastName": "doe",
  "birthday": "1990-01-01T00:00:00.000Z",
  "email": "johndoe@email.com",
  "city": "copenhagen",
  "country": "denmark",
  "street": "telegrafvej 9",
  "phoneNumber": 54512054,
  "startDate": "2018-01-01T00:00:00.000Z",
  "user": "5b965da7e8378620b44bf852",
  "lastChanged": "Tue Sep 11 2018 11:57:52 GMT+0200 (Romance Daylight Time)",
  "links": [...]
}
```
___
*[Request]* **<code>GET</code> /api/v1/employee/:id**
```
http://localhost:3000/api/v1/employee/5b965da7e8378620b44bf85z
```
*[Response]* 200 OK
```
{
  "_id": "5b965da7e8378620b44bf85z",
  "firstName": "john",
  "lastName": "doe",
  "birthday": "1990-01-01T00:00:00.000Z",
  "email": "johndoe@email.com",
  "city": "copenhagen",
  "country": "denmark",
  "street": "telegrafvej 9",
  "phoneNumber": 54512054,
  "startDate": "2018-01-01T00:00:00.000Z",
  "user": "5b965da7e8378620b44bf852",
  "lastChanged": "Tue Sep 11 2018 11:57:52 GMT+0200 (Romance Daylight Time)",
  "links": [...]
}
```
___
*[Request]* **<code>PATCH</code> /api/v1/employee/:id**
```
http://localhost:3000/api/v1/employee/5b965da7e8378620b44bf85z
{
  "firstName": "john",
  "lastName": "doe",
  "birthday": "1990-01-01T00:00:00.000Z",
  "email": "johndoe@email.com",
  "city": "copenhagen",
  "country": "denmark",
  "street": "telegrafvej 9",
  "phoneNumber": 54512054,
  "startDate": "2018-01-01T00:00:00.000Z"
}
```
*[Response]* 200 OK
```
{
  "_id": "5b965da7e8378620b44bf85z",
  "firstName": "john",
  "lastName": "doe",
  "birthday": "1990-01-01T00:00:00.000Z",
  "email": "johndoe@email.com",
  "city": "copenhagen",
  "country": "denmark",
  "street": "telegrafvej 9",
  "phoneNumber": 54512054,
  "startDate": "2018-01-01T00:00:00.000Z",
  "user": "5b965da7e8378620b44bf852",
  "lastChanged": "Tue Sep 11 2018 11:57:52 GMT+0200 (Romance Daylight Time)",
  "links": [...]
}
```
___
*[Request]* **<code>DELETE</code> /api/v1/employee/:id**
```
http://localhost:3000/api/v1/employee/5b965da7e8378620b44bf85z
```
*[Response]* 200 OK
```
{
  "status": 200,
  "message": "Successfully deleted employee"
}
```
___
### Job
*[Request]* **<code>GET</code> /api/v1/employee/:id/job**
```
http://localhost:3000/api/v1/employee/5b965da7e8378620b44bf85z/job
```
*[Response]* 200 OK
```
{  
  "jobTitle": "Empty",
  "description": "Empty",
  "_id": "5b965da7e8378620b44bdbc1",
  "employee_id": "5b965da7e8378620b44bf85z",
  "links": [...]
}
```
___
*[Request]* **<code>PATCH</code> /api/v1/employee/:id/job**
```
http://localhost:3000/api/v1/employee/5b965da7e8378620b44bf85z/job
{
  "jobTitle": "IT Supporter",
  "description": "On call IT support"
}
```
*[Response]* 200 OK
```
{
  "jobTitle": "IT Supporter",
  "description": "On call IT support",
  "_id": "5b965da7e8378620b44bdbc1",
  "employee_id": "5b965da7e8378620b44bf85z",
  "links": [...]
}
```
___
### Schedule
*[Request]* **<code>GET</code> /api/v1/employee/:id/schedules**
```
http://localhost:3000/api/v1/employee/5b965da7e8378620b44bf85z/schedules
```
*[Response]* 200 OK
```
{  
  "count": 2,
  "schedules": [
    {
      "_id": "",
      "work_date": "2018-09-11",
	    "start_work_hour": "2018-09-11T20:00:00.000Z",
      "end_work_hour": "2018-09-11T23:00:00.000Z",
      "links": [...]
    },
    ...
  ]
}
```
___
*[Request]* **<code>POST</code> /api/v1/employee/:id/schedules**
```
http://localhost:3000/api/v1/employee/5b965da7e8378620b44bf85z/schedules
{
  "is_holiday": true (bool),
  "is_weekend": true (bool),
  "work_date": "2018-09-11",
	"start_work_hour": "2018-09-11T20:00:00.000Z",
  "end_work_hour": "2018-09-11T23:00:00.000Z"
}
```
*[Response]* 200 OK
```
{
  "is_holiday": true,
  "is_weekend": true,
  "_id": "5b965da7e8378620b44bdbc9",
  "employee_id": "5b965da7e8378620b44bf85z",
  "work_date": "2018-09-11T00:00:00.000Z",
  "start_work_hour": "2018-09-11T20:00:00.000Z",
  "end_work_hour": "2018-09-11T23:00:00.000Z",
  "links": [...]
}
```
___
*[Request]* **<code>GET</code> /api/v1/employee/:id/schedules/:schedulesid**
```
http://localhost:3000/api/v1/employee/5b965da7e8378620b44bf85z/schedules/5b965da7e8378620b44bdbc9
```
*[Response]* 200 OK
```
{
  "is_holiday": true,
  "is_weekend": true,
  "_id": "5b965da7e8378620b44bdbc9",
  "employee_id": "5b965da7e8378620b44bf85z",
  "work_date": "2018-09-11T00:00:00.000Z",
  "start_work_hour": "2018-09-11T20:00:00.000Z",
  "end_work_hour": "2018-09-11T23:00:00.000Z",
  "links": [...]
}
```
___
*[Request]* **<code>PATCH</code> /api/v1/employee/:id/schedules/:schedulesid**
```
http://localhost:3000/api/v1/employee/5b965da7e8378620b44bf85z/schedules/5b965da7e8378620b44bdbc9
{
  "is_holiday": false (bool),
  "is_weekend": false (bool),
  "work_date": "2018-09-10",
  "start_work_hour": "2018-09-10T20:00:00.000Z",
  "end_work_hour": "2018-09-10T23:00:00.000Z"
}
```
*[Response]* 200 OK
```
{
  "is_holiday": false,
  "is_weekend": false,
  "_id": "5b965da7e8378620b44bdbc9",
  "employee_id": "5b965da7e8378620b44bf85z",
  "work_date": "2018-09-10T00:00:00.000Z",
  "start_work_hour": "2018-09-10T20:00:00.000Z",
  "end_work_hour": "2018-09-10T23:00:00.000Z",
  "links": [...]
}
```
___
*[Request]* **<code>PATCH</code> /api/v1/employee/:id/schedules/:schedulesid**
```
http://localhost:3000/api/v1/employee/5b965da7e8378620b44bf85z/schedules/5b965da7e8378620b44bdbc9
```
*[Response]* 200 OK
```
{
  "status": 200,
  "message": "Successfully deleted schedule"
}
```
___
### Wallet
*[Request]* **<code>GET</code> /api/v1/employee/:id/wallet**
```
http://localhost:3000/api/v1/employee/5b965da7e8378620b44bf85z/wallet
```
*[Response]* 200 OK
```
{
	"wage": 200,
	"salary": 0,
	"paymentMethod": "Hourly",
	"lastChanged": "2018-09-11T08:27:18.000Z",
	"_id": "5b965da7e8378620b44bdbc2",
	"employee_id": "5b965da7e8378620b44bf85z",
	"links": [...]
}
```
___
*[Request]* **<code>PATCH</code> /api/v1/employee/:id/wallet**
```
http://localhost:3000/api/v1/employee/5b965da7e8378620b44bf85z/wallet
{
	"wage": 0,
	"salary": 32000,
	"paymentMethod": "Monthly",
}
```
*[Response]* 200 OK
```
{
	"wage": 0,
	"salary": 32000,
	"paymentMethod": "Monthly",
	"lastChanged": "2018-09-11T08:27:18.000Z",
	"_id": "5b965da7e8378620b44bdbc2",
	"employee_id": "5b965da7e8378620b44bf85z",
	"links": [...]
}
```
___
### Workhours
*[Request]* **<code>GET</code> /api/v1/employee/:id/workhours**
```
http://localhost:3000/api/v1/employee/5b965da7e8378620b44bf85z/workhours
```
*[Response]* 200 OK
```
{
	"totalHoursThisPaycheck": 0,
	"totalOvertimeHoursThisPaycheck": 0,
	"_id": "5b965da7e8378620b44bdbc3",
	"employee_id": "5b965da7e8378620b44bf85z",
	"links": [...]
}
```
___
*[Request]* **<code>PATCH</code> /api/v1/employee/:id/workhours**
```
http://localhost:3000/api/v1/employee/5b965da7e8378620b44bf85z/workhours
{
	"totalHoursThisPaycheck": 0,
	"totalOvertimeHoursThisPaycheck": 0,
}
```
*[Response]* 200 OK
```
{
	FEJL ATM
}
```
___
___
## Authors
- BalenD - [BalenD](https://github.com/BalenD)
- Mikkel - [x-mfh](https://github.com/x-mfh)
- Jason - [Sabeniano](https://github.com/Sabeniano)
