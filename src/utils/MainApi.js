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
let userId = '6UyFS20Nj9QWELpH3LfXn7wgCaH3';
const userRef = doc(db, 'users', userId);

export const BASE_URL = 'http://localhost:9999';

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res);
};

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

// проверка мейла
export const getUserInfo = async (id) => {
  userId = id;
  const docRef = doc(db, 'users', id);
  const userInfo = await getDoc(docRef);
  if (userInfo.exists()) {
    return userInfo.data();
  } else {
    throw new Error('Document not found');
  }
};
// проверка токена
// export const autorization = (token) => {
//   return fetch(`${BASE_URL}/users/me`, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${token}`,
//     },
//   }).then((res) => checkResponse(res));
// };

export const updateUser = ({name, email}) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('JWT')}`,
    },
    body: JSON.stringify({
      name: name,
      email: email,
    }),
  }).then((res) => checkResponse(res));
};

// export const myMovies = () => {
//   return fetch(`${BASE_URL}/movies`, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${localStorage.getItem('JWT')}`,
//     },
//   }).then((res) => checkResponse(res));
// };

// export const addMovies = (movie) => {
//   return fetch(`${BASE_URL}/movies`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${localStorage.getItem('JWT')}`,
//     },
//     body: JSON.stringify({
//       country: movie.country,
//       director: movie.director,
//       duration: movie.duration,
//       year: movie.year,
//       description: movie.description,
//       image: `https://api.nomoreparties.co${movie.image.url}`,
//       trailerLink: movie.trailerLink,
//       thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
//       movieId: movie.id.toString(),
//       nameRU: movie.nameRU,
//       nameEN: movie.nameEN,
//     }),
//   }).then((res) => checkResponse(res));
// };
export const likeMovies = async (name) => {
  console.log('userId :>> ', userId);
  return await updateDoc(userRef, {
    movies: arrayUnion(name),
  });
};

export const disLakeMovies = async (name) => {
  // Atomically remove a region from the "regions" array field.
  await updateDoc(userRef, {
    movies: arrayRemove(name),
  });
};
