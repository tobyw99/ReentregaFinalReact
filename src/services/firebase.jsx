import { initializeApp } from "firebase/app";
import { getDatabase, ref, child, get, set, remove } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDaTD95P_ZGztQlVIVJwcurxMN2bBI9l64",
  authDomain: "store-30b3c.firebaseapp.com",
  projectId: "store-30b3c",
  storageBucket: "store-30b3c.appspot.com",
  messagingSenderId: "634650612818",
  appId: "1:634650612818:web:ae263dbe541095cef83b8b",
  databaseURL: "https://store-30b3c-default-rtdb.firebaseio.com/"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db, ref, child, get, set, remove };
