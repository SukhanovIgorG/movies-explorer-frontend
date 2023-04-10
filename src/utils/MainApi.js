import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import {firebaseConfig} from '../fireBaseConfig';
import {initializeApp} from 'firebase/app';
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
} from 'firebase/firestore';
import {updateDoc, arrayUnion, arrayRemove} from 'firebase/firestore';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const usersRef = collection(db, 'users');
let userId = localStorage.getItem('userId');
const userRef = doc(db, 'users', userId);

export const register = ({name, email, password}) => {
  return createUserWithEmailAndPassword(auth, email, password).then(
    (userCredential) => {
      const newUser = userCredential.user;
      setDoc(doc(usersRef, newUser.uid), {
        name: name,
        email: email,
        password: password,
        movies: [],
        createdAt: newUser.metadata.createdAt,
        creationTime: newUser.metadata.creationTime,
      });
      return newUser;
    }
  );
};

export const login = ({email, password}) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const getUserInfo = async () => {
  const userInfo = await getDoc(userRef);
  if (userInfo.exists()) {
    return userInfo.data();
  } else {
    throw new Error('Document not found');
  }
};

export const updateUser = async (name) => {
  return await updateDoc(userRef, {
    name: name,
  });
};

export const likeMovies = async (name) => {
  return await updateDoc(userRef, {
    movies: arrayUnion(name),
  });
};

export const disLakeMovies = async (name) => {
  await updateDoc(userRef, {
    movies: arrayRemove(name),
  });
};
