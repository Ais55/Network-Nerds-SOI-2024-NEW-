Add two .env files to both client and server and mention variables as follows:
For client:
    1. VITE_API_URL: the URL:PORT of where the server will run (eg. 3001)
For server:
    1. PORT: the PORT where the server will run. It must be same as PORT in VITE_API_URL of .env of client (eg. 3001)
    2. URL: the URL of the database used by mongoDB (eg. mongodb://127.0.0.1:27017/bookstore)
    3. Admin_Key: Used to encrypt and decrypt admin token (eg. set as admin-key)
    4. Student_KeyUsed to encrypt and decrypt admin token (eg. set as student-key)
To start the application:
    1. Open the server folder in terminal and run npm start
        npm i
        npm start
    2. Open the client folder in terminal and run the following commands:
        npm i
        npm run dev
    3. On server side, run the following to create admin account:
        node seed.js

