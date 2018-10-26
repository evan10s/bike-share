// Initialize Firebase

function firebaseInit() {
    var config = {
        apiKey: "AIzaSyBGRv6tLx9sQu6PdzACGvO-ocxNBdG0KsM",
        authDomain: "bike-share-3e217.firebaseapp.com",
        databaseURL: "https://bike-share-3e217.firebaseio.com",
        projectId: "bike-share-3e217",
        storageBucket: "bike-share-3e217.appspot.com",
        messagingSenderId: "1081586548166"
    };
    firebase.initializeApp(config);
}