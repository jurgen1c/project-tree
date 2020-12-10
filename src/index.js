import './styles.scss';
import firebase from 'firebase/app';
import "firebase/analytics";
import 'firebase/auth';
import 'firebase/firestore';
import {PForm, BForm, UForm} from './forms';
import  { format } from 'date-fns';
import navWrap from './nav';

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
const auth = firebase.auth();

const content = document.querySelector('body');
const formTree = new PForm();
const formBranch = new BForm();
const treeList = document.createElement('div');
const branchList = document.createElement('div');
const updateTree = new PForm();
const updateBranch = new BForm();

function treeUpdate(el, id){
  el.appendChild(updateTree.content)
  updateTree.content.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('trees').doc(id).update({
      title: updateTree.content.title.value,
      description: updateTree.content.description.value,
      color: updateTree.content.color.value
    })
    el.removeChild(updateTree.content);
  })
}

function branchUpdate(el, id){
  el.appendChild(updateBranch.content)
  updateBranch.content.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('branches').doc(id).update({
      title: updateBranch.content.title.value,
      description: updateBranch.content.description.value,
      due_date: updateBranch.content.due_date.value,
      priority: updateBranch.content.priority.value,
      notes: updateBranch.content.notes.value
    })
    el.removeChild(updateBranch.content);
  })
}

function renderBranches(branch){
  let bLi = document.createElement('li');
  let bTitle = document.createElement('h3');
  let bStatus = document.createElement('input');
  let bPriority = document.createElement('span');
  let bDes= document.createElement('p');
  let due = document.createElement('span');
  let bRemove = document.createElement('button');
  let bUpdate = document.createElement('button');
  let bNotes = document.createElement('p');

  bLi.setAttribute('data-id', branch.id);
  bStatus.type = 'checkbox';

  bPriority.textContent = branch.data().priority;
  bNotes.textContent = branch.data().notes;
  bTitle.textContent = branch.data().title;
  bDes.textContent = branch.data().description;
  due.textContent = branch.data().due_date;
  due.textContent = format(new Date(due.textContent), 'do MMMM yyyy')
  
  bRemove.innerHTML = 'X';
  bUpdate.innerHTML = 'Update';

  bLi.appendChild(bTitle);
  bLi.appendChild(bPriority);
  bLi.appendChild(due);
  bLi.appendChild(bDes);
  bLi.appendChild(bRemove);
  bLi.appendChild(bUpdate);
  bLi.appendChild(bNotes);

  bRemove.addEventListener('click', (e) => {
    e.stopPropagation();
    let id = e.target.parentElement.getAttribute('data-id');
    db.collection('branches').doc(id).delete();
  })
  bUpdate.addEventListener('click', (e) => {
    e.stopPropagation();
    let id = e.target.parentElement.getAttribute('data-id');
    branchUpdate(li, id);
  })
  bStatus.addEventListener('change', () => {
    if(this.checked){
      db.collection('branches').doc(branch.id).update({
          status: true
      });
    }else{
      db.collection('branches').doc(branch.id).update({
        status: false
      });
    }
  })
  branchList.appendChild(bLi);
}

function showBranches(parent, id){
  branchList.innerHTML = '';
  db.collection('branches').where('tree_id', '==', id).orderBy('due_date').onSnapshot(bsnapshot => {
    let bchanges = bsnapshot.docChanges();
    bchanges.forEach(bchange => {
      if(bchange.type == 'added'){
        renderBranches(bchange.doc);
      }else if(bchange.type == 'modified'){
        renderBranches(bchange.doc);
      }else if(bchange.type == 'removed'){
        let li = treeList.querySelector('[data-id=' + bchange.doc.id + ']');
        treeList.removeChild(li);
      }
    })
  })
  parent.appendChild(formBranch.content);
  parent.appendChild(branchList);
}

function renderTree(doc){
  let li = document.createElement('li');
  let title = document.createElement('h3');
  let description = document.createElement('p');
  let color = document.createElement('span');
  let remove = document.createElement('button');
  let update = document.createElement('button');
  let show = document.createElement('button');

  li.setAttribute('data-id', doc.id);
  title.textContent = doc.data().title;
  description.textContent = doc.data().description;
  color.textContent = doc.data().color;
  remove.innerHTML = 'X';
  update.innerHTML = 'Update';
  show.innerHTML = 'Show todos';

  li.appendChild(title);
  li.appendChild(description);
  li.appendChild(color);
  li.appendChild(remove);
  li.appendChild(update);
  li.appendChild(show);

  remove.addEventListener('click', (e) => {
    e.stopPropagation();
    let id = e.target.parentElement.getAttribute('data-id');
    db.collection('trees').doc(id).delete();
  })
  update.addEventListener('click', (e) => {
    e.stopPropagation();
    let id = e.target.parentElement.getAttribute('data-id');
    treeUpdate(li, id);
  })
  show.addEventListener('click', (e) => {
    e.stopPropagation();
    let id = e.target.parentElement.getAttribute('data-id');
    showBranches(li, id)
  })

  treeList.appendChild(li);
}

//db.collection('trees').where('title', '>', 'n').get()

// Getting data

/* db.collection('trees').orderBy('title').get().then((snapshot) => {
  snapshot.docs.forEach(doc => {
    renderTree(doc);
  })
}); */

// Real Time Listener ------------

db.collection('trees').orderBy('title').onSnapshot(snapshot => {
  let changes = snapshot.docChanges();
  changes.forEach(change => {
    if(change.type == 'added'){
      renderTree(change.doc);
    }else if(change.type == 'modified'){
      renderTree(change.doc);
    }else if(change.type == 'removed'){
      let li = treeList.querySelector('[data-id=' + change.doc.id + ']');
      treeList.removeChild(li);
    }
  })
})

// Saving data

formTree.content.addEventListener('submit', (e) => {
  e.preventDefault();
  db.collection('trees').add({
    title: formTree.content.title.value,
    description: formTree.content.description.value,
    color: formTree.content.color.value
  })
  formTree.content.reset();
})

formBranch.content.addEventListener('submit', (e) => {
  e.preventDefault();
  let id = e.target.parentElement.getAttribute('data-id');
  db.collection('branches').add({
    title: formBranch.content.title.value,
    priority: formBranch.content.priority.value,
    description: formBranch.content.description.value,
    status: false,
    due_date: formBranch.content.due_date.value,
    notes: formBranch.content.notes.value,
    tree_id: id
  })
  formBranch.content.reset();
})

window.addEventListener('load', () => {
  content.appendChild(navWrap);
  content.appendChild(formTree.content);
  content.appendChild(treeList);
});