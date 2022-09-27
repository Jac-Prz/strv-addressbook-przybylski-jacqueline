const {initializeApp} = require('firebase/app');

const firebaseInit = () => {
    
    const firebaseConfig = {
    apiKey: "AIzaSyCQn1B_6ntVsLShqPIQBAq2vT4qLeWcido",
    authDomain: "strv-addressbook-prz.firebaseapp.com",
    databaseURL: "https://strv-addressbook-prz-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "strv-addressbook-prz",
    storageBucket: "strv-addressbook-prz.appspot.com",
    messagingSenderId: "1080412489473",
    appId: "1:1080412489473:web:1e9450d0f2e3f3a2167d00"
}

const app = initializeApp(firebaseConfig);

console.log("init firebase")

}

module.exports = firebaseInit;