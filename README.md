 <h2 align="center"> STRV Assignment: Address Book RESTful API </h2>

<p> Users can to register/login with an email and password. Once issued JWS access key they can add an entry to their address book.
Users are stored on MongoDB and the address book on firebase.
The other CRUD operations to the adressbook will be handled by a frontend. </p>

<p> Endpoint: https://strv-addressbook-przybylski-jacqueline.onrender.com/
(hosted free on render, may take up to 30 seconds to start up)</p>

<h3 align="center"> ------ API Basic Functions ------ <h3>
REGISTER a new user: 
- POST request to '/register'
- 'email' and 'pwd' are required
AUTHORIZE a user:
- POST request to '/auth'
- 'email' and 'pwd' are required
REFRESH the access token:
- GET request to '/refresh'
- requires refresh JWT (sent in httpOnly cookies of successful authorization or registration)
- new access token will be issued
LOGOUT:
- GET request to '/logout'
- refresh token will be deleted from DB
ADD ENTRY TO ADDRESS BOOK:
- POST request to '/addresses' 
- requires access JWT (sent in response of successful authorization or registration)
TEST endpoint with postman


<h3 align="center">------ To Run Locally ------ <h3>
- Clone and install dependencies
- You will require the following environment variables including MongoDB: PORT MONGO_CONNECTION_URI JWT_ACCESS_TOKEN_SECRET JWT_REFRESH_TOKEN_SECRET
- & your Firebase Firestore credentials: serviceAccountKey in json format

<h3 align="center">------ To Test Locally ------ <h3>
Move the app.listen block of code to start.js and require it, as in shown in test branch.





