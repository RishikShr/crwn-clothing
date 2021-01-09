import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyCdOHC852jmlouCX7WOgZOULkd9AOXQPS4',
  authDomain: 'crwn-db-5af94.firebaseapp.com',
  databaseURL: 'https://crwn-db.firebaseio.com',
  projectId: 'crwn-db-5af94',
  storageBucket: 'crwn-db-5af94.appspot.com',
  messagingSenderId: '680454030088',
  appId: '1:680454030088:web:516c77b87a269fb7f362bd'
};

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
      
firebase.initializeApp(config);



export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;