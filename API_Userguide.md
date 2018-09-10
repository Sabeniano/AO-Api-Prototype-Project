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
  <a href="#error-codes">Error Codes</a> •
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
## Error Codes
| Error Code | Description |
|:-----:|-------------|
| <code>200</code> | OK - |
| <code>201</code> | Created -|
## Hateoas
## Example Parameters
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
```json
{
  "status": 201,
  "message": "User succesfully created"
}
```

*[Request]* **<code>POST</code> /api/v1/auth/signin**
```
http://localhost:3000/api/v1/auth/signin
{
  "username": "john",
  "password": "Gesdf144!"
}
```

*[Response]* 200 OK
```json
{
  "status": 200,
  "message": "Auth successful",
  "token": "I1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Yjk2NWRhN2U4Mzc4NjIwYjQ0Y"
}
```

*[Request]* **<code>GET</code> /api/v1/auth/me**
```
http://localhost:3000/api/v1/auth/me
```

*[Response]* 200 OK
```json
{
  "role": "employee",
  "_id_": "5b965da7e8378620b44bf852",
  "username": "john",
  "email": "johndoe@email.com",
  "links":
}
```

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
```json
{
  "_id_": "5b965da7e8378620b44bf852",
  "username": "john",
  "email": "johndoe@email.com",
  "links":
}
```

*[Request]* **<code>DELETE</code> /api/v1/auth/me**
```
http://localhost:3000/api/v1/auth/me
```

*[Response]* 200 OK
```json
{
  "status": 200,
  "message": "Successfully deleted user"
}
```
### User
### Employee
### Job
### Schedule
### Wallet
### Workhours

## Authors
