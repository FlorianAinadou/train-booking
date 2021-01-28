importScripts('https://www.gstatic.com/firebasejs/7.6.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.6.0/firebase-messaging.js');

firebase.initializeApp({
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    apiKey: "AIzaSyAV9yv7JBVboC-jpiUxa2FW143SuKBkGfg",
    authDomain: "bookingtrain-a8f8c.firebaseapp.com",
    projectId: "bookingtrain-a8f8c",
    storageBucket: "bookingtrain-a8f8c.appspot.com",
    messagingSenderId: "110686295619",
    appId: "1:110686295619:web:026278847e445c0ac1a6f6",
    measurementId: "G-6W3Q0EM01S"
});

const messaging = firebase.messaging();
