import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyD_huN7oc99dKIq13XCE_KmPdHStOZp27Q",
    authDomain: "crwn-db-59a29.firebaseapp.com",
    databaseURL: "https://crwn-db-59a29.firebaseio.com",
    projectId: "crwn-db-59a29",
    storageBucket: "crwn-db-59a29.appspot.com",
    messagingSenderId: "1081182842121",
    appId: "1:1081182842121:web:d8d7325dc3217cbe0537d8"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
