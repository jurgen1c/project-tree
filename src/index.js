import './style.scss';
import firebase from 'firebase/app';
import "firebase/analytics";
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAiZ8_iZgAYH3-NfyMdxOVngf3ThIEj1Io",
  authDomain: "project-tree-81da1.firebaseapp.com",
  projectId: "project-tree-81da1",
  storageBucket: "project-tree-81da1.appspot.com",
  messagingSenderId: "243197059844",
  appId: "1:243197059844:web:4599b8cb548e8154202651",
  measurementId: "G-4EK7YXDVC1"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();