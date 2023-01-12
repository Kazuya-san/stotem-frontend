// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBtuXayhopo88McBjLFLMFzGhu2E1Ck0z8",
//   authDomain: "dictoapp-e7626.firebaseapp.com",
//   projectId: "dictoapp-e7626",
//   storageBucket: "dictoapp-e7626.appspot.com",
//   messagingSenderId: "965593020432",
//   appId: "1:965593020432:web:562ed519490740b6d7b295",
//   measurementId: "G-7SYM6G2ZSD",
// };

const firebaseConfig = {
  apiKey: "AIzaSyAYRr9pZWtQ0ZPM1eI_XWovfjE3-6gEsf0",
  authDomain: "stotem-52433.firebaseapp.com",
  projectId: "stotem-52433",
  storageBucket: "stotem-52433.appspot.com",
  messagingSenderId: "1095589277386",
  appId: "1:1095589277386:web:118a7ae29b6125d7ea8e33",
  measurementId: "G-5JK2K3LG3L",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
