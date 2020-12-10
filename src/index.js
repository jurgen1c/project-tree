import './styles.scss';
import { db, auth } from './fire'
import { navControl, navWrap, logout } from './nav'
import { loginForm, signupForm } from './forms';
import { renderTree, formEvents } from './tree'

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
  const email = signupForm.form.email.value;
  const password = signupForm.form.password.value;
  auth.createUserWithEmailAndPassword(email, password).then(cred => {
    signupForm.content.style.display = 'none';
    signupForm.form.reset();
  }).catch(err => {
    console.log(err.message)
  })
})

loginForm.form.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = loginForm.form.email.value
  const password = loginForm.form.password.value
  auth.signInWithEmailAndPassword(email, password).then(cred => {
    loginForm.content.style.display = 'none';
    loginForm.form.reset();
  }).catch(err => {
    console.log(err.message)
  })
})


// logout.addEventListener('click', (e) => {
//   e.preventDefault();
//   auth.signout();
// })

formEvents(user);
window.addEventListener('load', () => {
  content.appendChild(loginForm.content);
  content.appendChild(signupForm.content);
  content.appendChild(navWrap);
  // content.appendChild(formTree.content);
  // content.appendChild(treeList);
});
