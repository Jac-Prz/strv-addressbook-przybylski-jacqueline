STRV Assignment: Address Book RESTful API

Endpoint: https://strv-addressbook-przybylski-jacqueline.onrender.com/
(hosted free on render, may take up to 30 seconds to start up)

--
---- API Basic Functions ----

REGISTER a new user: 
- POST request to '/reg'
- 'email' and 'pwd' are required

AUTHORIZE a user:
- POST request to '/auth'
- 'email' and 'pwd' are required

REFRESH the access token:
- GET request to '/refresh'
- requires refresh JWT (sent in httpOnly cookies of successful authorization or registration)

LOGOUT:
- GET request to '/logout'

ADD ENTRY TO ADDRESS BOOK:
- POST request to '/addresses' 
- requires access JWT (sent in response of successful authorization or registration)

TEST endpoint with postman

--
---- TO RUN LOCALLY ----

You will require the following environment variables including MongoDB :
PORT
MONGO_CONNECTION_URI
JWT_ACCESS_TOKEN_SECRET
JWT_REFRESH_TOKEN_SECRET

& your Firebase Firestore credentials: serviceAccountKey in json format

--

---- To Test Locally ----

Create start.js as in shown in test branch




