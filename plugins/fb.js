/* eslint-disable indent */
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
}
const db = firebase.firestore()
export default db
