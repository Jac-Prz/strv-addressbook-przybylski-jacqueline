 <br>
 <h2 align="center"> STRV Assignment: Address Book </h2>
<br>
<p> A RESTful API where users can register/login with an email and password. Once successfully authenticated and they can add an entry to their address book.
Users are stored on MongoDB and the address book on firebase. Authentication by JWTs.
The other CRUD operations to the adressbook will be handled by a frontend. </p>

<p> Endpoint: https://strv-addressbook-przybylski-jacqueline.onrender.com/ <br>
(hosted free on render, may take up to 30 seconds to start up)</p>
<br>


<h3> ------ API Basic Functions ------ </h3>
<p>
REGISTER a new user:  <br>
- POST request to '/register'<br>
- 'email' and 'pwd' are required<br><br>
AUTHORIZE a user:<br>
- POST request to '/auth'<br>
- 'email' and 'pwd' are required<br><br>
REFRESH the access token:<br>
- GET request to '/refresh'<br>
- requires refresh JWT (sent in httpOnly cookies of successful authorization or registration)<br>
- new access token will be issued<br><br>
LOGOUT:<br>
- GET request to '/logout'<br>
- refresh token will be deleted from DB<br><br>
ADD ENTRY TO ADDRESS BOOK:<br>
- POST request to '/addresses' <br>
- requires access JWT (sent in response of successful authorization or registration)<br>
- 'firstName', 'lastName', 'phone' and 'address' are required as strings<br><br>
You can TEST endpoints with postman<br> </p>
<br>
<h3>------ To Run Locally ------ </h3>
<p>- Clone main and and install dependencies<br>
- You will require the following environment variables including MongoDB: PORT MONGO_CONNECTION_URI JWT_ACCESS_TOKEN_SECRET JWT_REFRESH_TOKEN_SECRET<br>
- & your Firebase Firestore credentials: serviceAccountKey in json format<br></p>
<br>
<h3>------ To Test Locally ------ </h3>
<p>- Move the app.listen block of code to start.js and require it, as in shown in test branch.<br>
- or clone test brach and install dependencies
- run test files seperately with jest</p>






