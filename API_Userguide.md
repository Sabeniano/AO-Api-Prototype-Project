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
- The section will show you how to format your JSON, what values to insert and expect.

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
  "password": "Gesdf144!"
  "email": "johndoe@email.com",
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
  "status": 201,
  "message": "User succesfully created"
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
  "password": "Gesdf144!"
  "email": "johndoe@email.com",
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
### Job
### Schedule
### Wallet
### Workhours

## Authors
- BalenD - [BalenD](https://github.com/BalenD)
- Mikkel - [x-mfh](https://github.com/x-mfh)
- Jason - [Sabeniano](https://github.com/Sabeniano)
