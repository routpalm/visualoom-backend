# brickjong
class project for UOCS 422

## Table of Contents
- [Environment](#environment)
  - [Steps to Reproduce](#steps-to-reproduce)
  - [Local PostgreSQL Setup](#for-local-postgresql)
- [Usage](#usage)
  - [Hello World (PostgreSQL)](#hello-world-postgresql)
  - [Hello World (test endpoint)](#hello-world-test-endpoint)
- [Endpoints](#endpoints)
    - [A note about protected endpoints]() 
    - [/helloworlds](#helloworlds)
    - [/helloworlds/protected](#helloworldsprotected)
    - [/users](#users)

---

# Environment
## Steps to reproduce:
- Download and Install [Node.js from the official website](https://nodejs.org/en)
- Verify by running  
```node --version; npm --version```
- Node version: v20.18.0
- NPM version: 10.8.2
- Create project directory
- Change the current working directory to the project directory
- Initialize the project by running  
  ```npm init -y```
- Install dependencies:
    - dotenv@16.4.5
    - express@4.21.1
    - pg-hstore@2.3.4
    - pg@8.13.0
    - sequelize@6.37.4

  ```npm install express sequelize pg pg-hstore dotenv```
-  Initialize Sequelize  
```npx sequelize-cli init```

## For local PostgreSQL
- Download and install from [PostgreSQL Official Site.](https://www.postgresql.org/download/)
- Be sure to include pgAdmin 4 in the installation options
- After installation, ensure that the PostgreSQL service is running. You can start it manually via the PostgreSQL application or with "pgAdmin" or "SQL Shell (psql)"

  - Windows: Search for "pgAdmin" or "SQL Shell (psql)" in the Start menu.
  - Linux/MacOS: Use the terminal to start PostgreSQL if it isn’t running automatically.

- Modify the config/config.env file to point to your local PostgreSQL setup.




- create ./config/config.env
```
# ./config/config.env

NODE_ENV=development

DATABASE_URL=postgresql://username:password@host:port/dbname

```
- Default values
  - Default username is ```postgres```
  - Default database name is ```postgres```
  - Default host is ```localhost```
  - Default port is ```5432```
  - Details can be found in pgAdmin 4 by selecting your server and naviagting to the "properties" tab.
  - If you are connected to a server in SQL Shell, you can use the command ```\conninfo```
- run ./index.js
- verify backend is running by visiting ```localhost:port```

# Usage

## Hello World (postgresQL)

- Insert a row into the HelloWorlds table using
```
INSERT INTO "HelloWorlds" (message, "createdAt", "updatedAt")
VALUES ('Hello World!', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
```
- Retrieve the row using
```
SELECT * FROM "HelloWorlds"
```

- Or, in your browser, visit ```http://localhost:3001/helloworld```
- Or, from the command line run

```
curl http://localhost:3001/helloworld
```

N.B. that sequelize automatically pluralizes the table, i.e. "HelloWorlds" instead of "HelloWorld"

## Hello World (test endpoint)

### 1. GET `/helloworlds`  
  Retrieves the most recent HelloWorld message  
  - Example:  
  ```curl http://localhost:3001/helloworlds```
  - Response:  
  ```{ "message": "Hello World!" }```
### 2. POST /helloworld
  Creates a new HelloWorld message
  - Example:  
  ```curl -X POST http://localhost:3001/helloworlds -H "Content-Type: application/json" -d '{"message": "Hello from cURL!"}'```
  - Response:
  ```
{
    "id": 1,
    "message": "Hello from cURL!",
    "createdAt": "2024-10-20T04:07:30.111Z",
    "updatedAt": "2024-10-20T04:07:30.111Z"
}
```
## Endpoints:

---

### A note about protected endpoints:

A JWT (JSON Web Token) must be supplied with the header of all protected routes. Protected routes receiving a request
without a JWT will return status ```401``` with the message ```Unauthorized: No token provided```. Protected routes
receiving a request with an invalid token will return status ```403``` with the message
```Unauthorized: Invalid token```.

#### TODO: Provide usage examples

---

### /helloworlds



| **Endpoint**       | **HTTP Method** | **Description**                        | **Parameters**                   | **Request Body**        | **Headers**                    | **Response**                                                                                                           |
|--------------------|-----------------|----------------------------------------|----------------------------------|-------------------------|---------------------------------|-------------------------------------------------------------------------------------------------------------------------|
| `/helloworlds/`    | `GET`           | Retrieves HelloWorld objects with optional filters. | `n` (query) – limit results <br> `offset` (query) – pagination offset | None                    | None                            | `200 OK` – Array of HelloWorld messages <br> `404 Not Found` – No messages found <br> `500 Internal Server Error`      |
| `/helloworlds/:id` | `GET`           | Retrieves a specific HelloWorld by ID. | `id` (path) – Unique HelloWorld ID | None                    | None                            | `200 OK` – HelloWorld message object <br> `404 Not Found` – Message not found <br> `500 Internal Server Error`         |
| `/helloworlds/`    | `POST`          | Creates a new HelloWorld message.      | None                             | `message` (string)      | None                            | `201 Created` – New HelloWorld object <br> `500 Internal Server Error`                                                  |
| `/helloworlds/:id` | `PUT`           | Updates an existing HelloWorld message.| `id` (path) – Unique HelloWorld ID | `message` (string)      | None                            | `200 OK` – Updated HelloWorld object <br> `404 Not Found` – Message not found <br> `500 Internal Server Error`         |
| `/helloworlds/:id` | `DELETE`        | Deletes a HelloWorld message by ID.    | `id` (path) – Unique HelloWorld ID | None                    | None                            | `204 No Content` – Success <br> `404 Not Found` – Message not found <br> `500 Internal Server Error`                   |

---

### /helloworlds/protected

These routes require [JWT verification](#a-note-about-protected-endpoints).

| **Protected Endpoint**       | **HTTP Method** | **Description**                        | **Parameters**                   | **Request Body**        | **Headers**                                        | **Response**                                                                                                           |
|------------------------------|-----------------|----------------------------------------|----------------------------------|-------------------------|----------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------|
| `/helloworlds/protected`     | `GET`           | Retrieves protected HelloWorld objects with optional filters. | `n` (query) – limit results <br> `offset` (query) – pagination offset | None                    | `Authorization: Bearer <JWT>`                   | `200 OK` – Array of HelloWorld messages <br> `404 Not Found` – No messages found <br> `500 Internal Server Error`      |
| `/helloworlds/protected/:id` | `GET`           | Retrieves a specific HelloWorld by ID. | `id` (path) – Unique HelloWorld ID | None                    | `Authorization: Bearer <JWT>`                   | `200 OK` – HelloWorld message object <br> `404 Not Found` – Message not found <br> `500 Internal Server Error`         |
| `/helloworlds/protected/`    | `POST`          | Creates a new HelloWorld message.      | None                             | `message` (string)      | `Authorization: Bearer <JWT>`                   | `201 Created` – New HelloWorld object <br> `500 Internal Server Error`                                                  |
| `/helloworlds/protected/:id` | `PUT`           | Updates an existing HelloWorld message.| `id` (path) – Unique HelloWorld ID | `message` (string)      | `Authorization: Bearer <JWT>`                   | `200 OK` – Updated HelloWorld object <br> `404 Not Found` – Message not found <br> `500 Internal Server Error`         |
| `/helloworlds/protected/:id` | `DELETE`        | Deletes a HelloWorld message by ID.    | `id` (path) – Unique HelloWorld ID | None                    | `Authorization: Bearer <JWT>`                   | `204 No Content` – Success <br> `404 Not Found` – Message not found <br> `500 Internal Server Error`                   |

---
### ```/users```

| **Endpoint**          | **HTTP Method** | **Description**                                     | **Parameters**                       | **Request Body**                                       | **Response**                                                                                                                                              |
|-----------------------|-----------------|-----------------------------------------------------|--------------------------------------|--------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `/users`              | `GET`           | Retrieves all users.                                | None                                 | None                                                   | `200 OK` – Array of users <br> `500 Internal Server Error` – Error message                                                                                 |
| `/users/:id`          | `GET`           | Retrieves a specific user by their internal ID.     | `id` (path) – User’s unique ID      | None                                                   | `200 OK` – User object <br> `404 Not Found` – User not found <br> `500 Internal Server Error` – Error message                                             |
| `/users/:id/artworks` | `GET`           | Retrieves all artworks by a user.                   | `id` (path) – User’s unique ID      | None                                                   | `200 OK` – Array of artworks <br> `404 Not Found` – User not found <br> `500 Internal Server Error` – Error message                                       |
| `/users/:id/likes`    | `GET`           | Retrieves all likes made by a user.                 | `id` (path) – User’s unique ID      | None                                                   | `200 OK` – Array of likes <br> `404 Not Found` – User not found <br> `500 Internal Server Error` – Error message                                          |
| `/users`              | `POST`          | Creates a new user with Google account details.     | None                                 | `googleId` (string) <br> `email` (string) <br> `name` (string) | `201 Created` – New user object <br> `400 Bad Request` – Error message                                              |
| `/users/:id`          | `PUT`           | Updates an existing user’s name or email.           | `id` (path) – User’s unique ID      | `email` (string, optional) <br> `name` (string, optional) | `200 OK` – Updated user object <br> `404 Not Found` – User not found <br> `400 Bad Request` – Error message                                            |
| `/users/:id`          | `DELETE`        | Deletes a user by their unique ID.                  | `id` (path) – User’s unique ID      | None                                                   | `200 OK` – Success message <br> `404 Not Found` – User not found <br> `500 Internal Server Error` – Error message                                         |
