/* eslint-disable indent */
// < !--The core Firebase JS SDK is always required and must be listed first-- >
//     <script src="https://www.gstatic.com/firebasejs/7.16.0/firebase-app.js"></script>

//     <!--TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries -->
// <script src="https://www.gstatic.com/firebasejs/7.16.0/firebase-analytics.js"></script>

//     <script>

// Your web app's Firebase configuration

import firebase from 'firebase/app'
import 'firebase/firestore'

if (!firebase.apps.length) {
    // eslint-disable-next-line no-var
    var firebaseConfig = {
        apiKey: 'AIzaSyBQ_pioeQWYjC7HXJogTqunTO2hKxj46bM',
        authDomain: 'invoerevenementenapp.firebaseapp.com',
        databaseURL: 'https://invoerevenementenapp.firebaseio.com',
        projectId: 'invoerevenementenapp',
        storageBucket: 'invoerevenementenapp.appspot.com',
        messagingSenderId: '1013503850303',
        appId: '1:1013503850303:web:5cc7eb96c2e0842d11058a',
        measurementId: 'G-61Y8500LJ7'
    }
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig)
    // firebase.analytics();
}
const db = firebase.firestore()
export default db

// const { TimeStamp, GeoPoint } = firebase.firestore
// export { TimeStamp, GeoPoint }

// </script>
