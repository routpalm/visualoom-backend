# brickjong
class project for UOCS 422

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

## For local PostreSQL
- Download and install from [PostgreSQL Official Site.](https://www.postgresql.org/download/)
- Be sure to include pgAdmin 4 in the installation options
- After installation, ensure that the PostgreSQL service is running. You can start it manually via the PostgreSQL application or with "pgAdmin" or "SQL Shell (psql)"

  - Windows: Search for "pgAdmin" or "SQL Shell (psql)" in the Start menu.
  - Linux/MacOS: Use the terminal to start PostgreSQL if it isn’t running automatically.

- Modify the config/config.json file to point to your local PostgreSQL setup.
  - Details can be found in pgAdmin 4 by selecting your server and naviagting to the "properties" tab.
  - If you are connected to a server in SQL Shell, you can use the command ```\conninfo```

# Usage

- create ./config/config.env
- currently only using ```DB_DEV_*``` entries
```
# ./config/config.env

DB_DEV_USERNAME=your-username
DB_DEV_PASSWORD=your-password
DB_DEV_NAME=your-database-name
DB_DEV_HOST=127.0.0.1
DB_DEV_PORT=5432

DB_TEST_USERNAME=your-username
DB_TEST_PASSWORD=your-password
DB_TEST_NAME=your-database-name
DB_TEST_HOST=127.0.0.1
DB_TEST_PORT=5432

DB_PROD_USERNAME=your-username
DB_PROD_PASSWORD=your-password
DB_PROD_NAME=your-database-name
DB_PROD_HOST=127.0.0.1
DB_PROD_PORT=5432
```
- Default values
  - Default username is ```postgres```
  - Default database name is ```postgres```
  - Default port is ```5432```

- run ./index.js
- verify backend is running by visiting ```localhost:3001```

# Hello World (postgresQL)

- Insert a row into the HelloWorlds table using
```
INSERT INTO "HelloWorlds" (message, "createdAt", "updatedAt")
VALUES ('Hello World!', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
```
- Retrieve the row using
```
SELECT * FROM "HelloWorlds"
```
N.B. that sequelize automatically pluralizes the table, i.e. "HelloWorlds" instead of "HelloWorld"
- OR, in your browser, visit ```http://localhost:3001/helloworld```, or from the command line run

```
curl http://localhost:3001/helloworld
```

# Hello World (endpoint)

### 1. GET `/helloworld`  
  Retrieves the most recent HelloWorld message  
  - Example:  
  ```curl http://localhost:3001/helloworld```
  - Response:  
  ```{ "message": "Hello World!" }```
### 2. POST /helloworld
  Creates a new HelloWorld message
  - Example:  
  ```curl -X POST http://localhost:3001/helloworld -H "Content-Type: application/json" -d '{"message": "Hello from cURL!"}'```
  - Response:
  ```
{
    "id": 1,
    "message": "Hello from cURL!",
    "createdAt": "2024-10-20T04:07:30.111Z",
    "updatedAt": "2024-10-20T04:07:30.111Z"
}
```