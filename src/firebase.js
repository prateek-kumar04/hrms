import { getAuth } from "firebase/auth";

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAuA0mk_G39NtO6pn75Oo7tHXki9cIsuks",
  authDomain: "hrms-ce797.firebaseapp.com",
  projectId: "hrms-ce797",
  storageBucket: "hrms-ce797.firebasestorage.app",
  messagingSenderId: "834703792166",
  appId: "1:834703792166:web:7e838c215c09227511aee7",
  measurementId: "G-S3NZVLNXY3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
