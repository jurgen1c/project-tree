import './styles.scss';
import {db, auth} from './fire'
import {navControl, navWrap} from './nav'
import { loginForm, signupForm } from './forms';
import renderTree, { formEvents } from './tree'

const content = document.querySelector('body');

auth.onAuthStateChanged(user => {
  if (user){
    navControl(user)
    // Real Time Listener ------------

    db.collection('trees').where('user_id', '==', user.uid).orderBy('title').onSnapshot(snapshot => {
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
    }, err => {
      console.log(err.message);
    })
  }else{
    navControl()
    console.log('user logged out')
  }
})

let user = auth.currentUser;

signupForm.form.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = signupForm.email.value;
  const password = signupForm.password.value;
  auth.createUserWithEmailAndPassword(email, password).then(cred => {
    signupForm.style.display = 'none';
    signupForm.reset();
  }).catch(err => {
    console.log(err.message)
  })
})

loginForm.form.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = loginForm.email.value
  const password = loginForm.password.value
  auth.signInWithEmailAndPassword(email, password).then(cred => {
    loginForm.style.display = 'none';
    loginForm.reset();
  }).catch(err => {
    console.log(err.message)
  })
})

logout.addEventListener('click', (e) => {
  e.preventDefault();
  auth.signout();
})



//db.collection('trees').where('title', '>', 'n').get()

// Getting data

/* db.collection('trees').orderBy('title').get().then((snapshot) => {
  snapshot.docs.forEach(doc => {
    renderTree(doc);
  })
}); */



formEvents(user);
window.addEventListener('load', () => {
  content.appendChild(loginForm);
  content.appendChild(signupForm);
  content.appendChild(navWrap);
  content.appendChild(formTree.content);
  content.appendChild(treeList);
});