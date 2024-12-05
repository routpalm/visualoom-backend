# Visualoom - backend

Development documentation for UO CS-422 class project.

## Table of Contents
- [Overview](#overview)
  - [Technology](#technology)
  - [File Structure](#file-structure)
  [Tests](#tests)
- [Environment](#environment)
  - [Docker](#docker)
  - [Steps to Reproduce](#steps-to-reproduce)
  - [Local PostgreSQL Setup](#for-local-postgresql)
- [Usage](#usage)
  - [Note on Express Ports](#note-on-express-ports)
  - [Hello World (PostgreSQL)](#hello-world-postgresql)
  - [Hello World (Using Browser)](#hello-world-using-browser)
  - [Hello World (Using CURL)](#hello-world-using-curl)
- [Endpoints](#endpoints)
  - [A Note About Protected Endpoints](#a-note-about-protected-endpoints)
    - [Example: React fetch Request](#1-example-react-fetch)
    - [Example: curl Request](#2-example-curl)
  - [/helloworlds](#helloworlds)
  - [/helloworlds/protected](#helloworldsprotected)
  - [/users](#users)
  - [/likes](#likes)
  - [/artworks](#artworks)

---
# Overview

The VisuaLoom back-end facilitates the storage and retrieval of objects used by the VisuaLoom front-end. A RESTful API provides access to the database store. Authentication is provided using OAuth2 through Google's OAuth service.

## Technology 

- Node.js
  - Node.js is a JavaScript runtime environment that allows the execution of JavaScript code outside of a web browser. This provides the basis for executing the application's code. 
- Express
  - Express is a fast, minimalist framework for Node.js. It provides the routing for the API's endpoints.   
- Sequelize
  - Sequelize is an ORM(object relational mapper) that supports PostreSQL, facilitating communication with the application's database.
- PostresQL
  - PostgreSQL is an open-source, object-relational database management system (ORDBMS) that supports SQL and JSON querying. This database stores all of  

---

## File Structure
- **./server** - Source root for back end
  - **/config** - Initialization scripts for project components
  - **/controllers** - Controller logic for API endpoints
  - **/migrations** - Stores scripts to 
  - **/models** - Definitions for objects stored in DB
  - **/routes** - Routes for the API
- **./index.js** - Entry point for the application
- **./package.json** - Required packages
  
---

# Tests

Integration tests are provided in `./tests/api.tests.js` using the [Jest testing framework](https://jestjs.io/), along with Axios to perform the HTTP requests. To run the tests, instances of the PostgreSQL database and the Express app `./server/index.js` must be running on the host machine, or from within the provided Docker composition. To run the tests, from the project root simply do `npm run test`.

---

# Environment
## Docker:
A Docker compose file is provided to rapidly construct a test environment. From the project root, run `docker compose up -d` to build and run the images. This includes an instance of PostgreSQL at `localhost:5432` and the Express app at `localhost:3001`.
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

For development and testing, you may want to host your own instance of the PostreSQL database on your own local machine. You can do so by following these steps:

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
- verify Express is listening by visiting ```localhost:3001```

# Usage

#### Note on Express ports:

the port for Express defaults to `3001`, but this can be changed by adding a `PORT=<port_number>` entry to the
config.env file.


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


## Hello World (using browser)

- The default Express port is `3001`
- If you changed the Express port with `PORT=<PORT_VALUE>` in `./config/config.env`, use that value instead.
- In your browser, visit ```http://localhost:3001/helloworlds```


---

## Hello World (using CURL)

- From the command line, run

    ```bash
    curl http://localhost:3001/helloworlds
    ```

**Note**: Sequelize automatically pluralizes the table, hence "HelloWorlds" instead of "HelloWorld."

### 1. GET `/helloworlds`
Retrieves the most recent HelloWorld message.

- Example:
  ```bash
  curl http://localhost:3001/helloworlds
  ```

- Response:
  ```json
  {
    "message": "Hello World!"
  }
  ```

### 2. POST `/helloworlds`
Creates a new HelloWorld message.

- Example:
  ```bash
  curl -X POST http://localhost:3001/helloworlds -H "Content-Type: application/json" -d '{"message": "Hello from cURL!"}'
  ```

- Response:
  ```json
  {
      "id": 1,
      "message": "Hello from cURL!",
      "createdAt": "2024-10-20T04:07:30.111Z",
      "updatedAt": "2024-10-20T04:07:30.111Z"
  }
  ```

### 3. PUT `/helloworlds/:id`
Updates an existing HelloWorld message by ID.

- Example:
  ```bash
  curl -X PUT http://localhost:3001/helloworlds/1 -H "Content-Type: application/json" -d '{"message": "Updated message from cURL!"}'
  ```

- Response:
  ```json
  {
      "id": 1,
      "message": "Updated message from cURL!",
      "createdAt": "2024-10-20T04:07:30.111Z",
      "updatedAt": "2024-10-20T04:10:45.678Z"
  }
  ```

- **Error Handling**:
  - `404 Not Found` – When the specified `id` does not exist:
    ```json
    {
      "message": "HelloWorld object not found"
    }
    ```
  - `500 Internal Server Error` – For any other server-related issues.

### 4. DELETE `/helloworlds/:id`
Deletes an existing HelloWorld message by ID.

- Example:
  ```bash
  curl -X DELETE http://localhost:3001/helloworlds/1
  ```

- Response:
  - `204 No Content` – Success, with no content returned.

- **Error Handling**:
  - `404 Not Found` – When the specified `id` does not exist:
    ```json
    {
      "message": "HelloWorld message not found"
    }
    ```
  - `500 Internal Server Error` – For any other server-related issues.



## Endpoints:

---

### A note about protected endpoints:

A JWT (JSON Web Token) must be supplied in the header of all protected routes. Protected routes receiving a request
without a JWT will return status ```401``` with the message ```Unauthorized: No token provided```. Protected routes
receiving a request with an invalid token will return status ```403``` with the message
```Unauthorized: Invalid token```.


#### 1. Example (React `fetch')
In a React component, we can use `fetch` to send the JWT as part of the `Authorization` header:

```javascript
const fetchProtectedData = async () => {
    const token = "your-jwt-token"; // Replace this with your actual JWT, e.g., from localStorage

    try {
        const response = await fetch("http://localhost:3001/helloworlds/protected", {  // Any protected route
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Data:", data);
    } catch (error) {
        console.error("Error fetching protected data:", error);
    }
};

```

### 2. Example (`curl`)

To test the endpoint with `curl`, include the `Authorization` header as follows:

```bash
curl -X GET http://localhost:3001/helloworlds -H "Authorization: Bearer your-jwt-token"
```

Replace `"your-jwt-token"` with an actual token. If the token is valid, you should get a successful response from the endpoint.

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

---

### ```/likes```

| **Endpoint**           | **HTTP Method** | **Description**                                         | **Parameters**                     | **Request Body**                      | **Response**                                                                                                                                                   |
|------------------------|-----------------|---------------------------------------------------------|------------------------------------|---------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `/likes`               | `GET`           | Retrieves recent likes with limit and offset.           | `offset` (query) - Start position <br> `limit` (query) - Max likes to return | None                                  | `200 OK` – Array of likes <br> `404 Not Found` – No likes found <br> `500 Internal Server Error` – Error message                                                |
| `/likes/:id`           | `GET`           | Retrieves a specific like by its ID.                    | `id` (path) – Like's unique ID     | None                                  | `200 OK` – Like object <br> `404 Not Found` – Like not found <br> `500 Internal Server Error` – Error message                                                  |
| `/likes/:id/user`      | `GET`           | Retrieves the user associated with a like.              | `id` (path) – Like's unique ID     | None                                  | `200 OK` – User object <br> `404 Not Found` – Like or associated user not found <br> `500 Internal Server Error` – Error message                              |
| `/likes/:id/artwork`   | `GET`           | Retrieves the artwork associated with a like.           | `id` (path) – Like's unique ID     | None                                  | `200 OK` – Artwork object <br> `404 Not Found` – Like or associated artwork not found <br> `500 Internal Server Error` – Error message                        |
| `/likes`               | `POST`          | Creates a new like with specified user and artwork IDs. | None                               | `user` (integer) - User ID <br> `artwork` (integer) - Artwork ID | `201 Created` – New like object <br> `500 Internal Server Error` – Error message                                        |
| `/likes/:id`           | `PUT`           | Updates a like's user or artwork association.           | `id` (path) – Like's unique ID     | `userId` (integer) - New User ID <br> `artworkId` (integer) - New Artwork ID | `200 OK` – Updated like object <br> `404 Not Found` – Like not found <br> `500 Internal Server Error` – Error message                                     |
| `/likes/:id`           | `DELETE`        | Deletes a like by its unique ID.                        | `id` (path) – Like's unique ID     | None                                  | `204 No Content` – Like successfully deleted <br> `404 Not Found` – Like not found <br> `500 Internal Server Error` – Error message                           |

### Explanation of Fields

- **`offset` and `limit`** in `GET /likes`: These optional query parameters allow the client to specify a starting point and the maximum number of likes to retrieve, supporting pagination.
- **Request body** in `POST /likes` and `PUT /likes/:id`: Both `userId` and `artworkId` fields specify associations between `Like`, `User`, and `Artwork`.

---

### `/artworks`

| **Endpoint**               | **HTTP Method** | **Description**                                          | **Parameters**                         | **Request Body**                                    | **Response**                                                                                                                                                   |
|----------------------------|-----------------|----------------------------------------------------------|----------------------------------------|-----------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `/artworks`                | `GET`           | Retrieves a limited number of artworks, sorted by most recent. | `n` (query) – Number of artworks to retrieve <br> `offset` (query) – Number of artworks to skip (default: 0) | None | `200 OK` – Array of artworks <br> `404 Not Found` – No artworks found <br> `500 Internal Server Error` – Error message |
| `/artworks/:id`            | `GET`           | Retrieves a specific artwork by its unique ID.           | `id` (path) – Artwork's unique ID     | None                                                | `200 OK` – Artwork object <br> `404 Not Found` – Artwork not found <br> `500 Internal Server Error` – Error message                                          |
| `/artworks/:id/user`       | `GET`           | Retrieves the user who created the specified artwork.     | `id` (path) – Artwork's unique ID     | None                                                | `200 OK` – User object associated with the artwork <br> `404 Not Found` – Artwork or user not found <br> `500 Internal Server Error` – Error message          |
| `/artworks/:id/likes`      | `GET`           | Retrieves all likes associated with a specified artwork.  | `id` (path) – Artwork's unique ID     | None                                                | `200 OK` – Array of likes <br> `404 Not Found` – Artwork or likes not found <br> `500 Internal Server Error` – Error message                                  |
| `/artworks`                | `POST`          | Creates a new artwork entry.                             | None                                   | None (or parameters to be defined)                   | `201 Created` – New artwork object <br> `500 Internal Server Error` – Error message                                                                           |
| `/artworks/:id`            | `PUT`           | Updates an existing artwork's fields.                    | `id` (path) – Artwork's unique ID     | None (or parameters to be defined)                   | `200 OK` – Updated artwork object <br> `404 Not Found` – Artwork not found <br> `500 Internal Server Error` – Error message                                   |
| `/artworks/:id`            | `DELETE`        | Deletes an artwork by its unique ID.                     | `id` (path) – Artwork's unique ID     | None                                                | `204 No Content` – Successfully deleted <br> `404 Not Found` – Artwork not found <br> `500 Internal Server Error` – Error message                             |

---
