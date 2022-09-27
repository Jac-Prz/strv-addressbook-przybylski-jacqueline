var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");
const firebaseInit = () => {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
      });
    console.log('Init firebase')      
}


module.exports = firebaseInit;