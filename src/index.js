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
const db = firebase.firestore();
db.settings({timestampsInSnapshots: true});

const content = document.querySelector('body');
const treeList = document.createElement('div');

function renderTree(){
  let li = document.createElement('li');
  let title = document.createElement('h3');
  let description = document.createElement('p');
  let color = document.createElement('span');

  li.setAttribute('data-id', doc.id);
  title.textContent = doc.data().title;
  description.textContent = doc.data().description;
  color.textContent = doc.data().color;

  li.appendChild(title);
  li.appendChild(description);
  li.appendChild(color);

  treeList.appendChild(li);

}

db.collection('trees').get().then((snapshot) => {
  snapshot.docs.forEach(doc => {
    renderTree(doc);
  })
});

window.addEventListener('load', () => {
  content.appendChild(treeList);
});