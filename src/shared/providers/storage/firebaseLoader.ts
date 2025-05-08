import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { firebaseConfig } from "../../../config/firebase";


const app = initializeApp(firebaseConfig);
const storagebucket = getStorage(app);

export  {storagebucket};