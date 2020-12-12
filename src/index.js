import './styles.scss';
import { db, auth } from './fire';
import { navControl, navWrap, logout } from './nav';
import { loginForm, signupForm } from './user_form';
import {
  renderTree, formEvents, branchWrapper, treeWrapper, formTree, treeList,
} from './tree';
import { newAccount } from './templates';

const content = document.querySelector('body');

auth.onAuthStateChanged(user => {
  if (user) {
    navControl(user);
    formEvents(user);
    // Real Time Listener ------------
    newAccount.email.textContent = `Email: ${user.email}`;
    newAccount.name.textContent = `Your are logged in as: ${user.displayName}`;
    db.collection('trees').where('user_id', '==', user.uid).orderBy('title').onSnapshot(snapshot => {
      const changes = snapshot.docChanges();
      changes.forEach(change => {
        if (change.type === 'added') {
          renderTree(change.doc);
        } else if (change.type === 'modified') {
          renderTree(change.doc);
        } else if (change.type === 'removed') {
          const li = treeList.querySelector(`[data-id=${change.doc.id}]`);
          treeList.removeChild(li);
        }
      });
    });
  } else {
    navControl();
  }
});

signupForm.form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = signupForm.form.userName.value;
  const email = signupForm.form.email.value;
  const password = signupForm.form.password.value;
  auth.createUserWithEmailAndPassword(email, password).then(() => {
    signupForm.content.style.display = 'none';
    signupForm.form.reset();
  });
  auth.currentUser.updateProfile({
    displayName: name,
  });
});

loginForm.form.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = loginForm.form.email.value;
  const password = loginForm.form.password.value;
  auth.signInWithEmailAndPassword(email, password).then(() => {
    loginForm.content.style.display = 'none';
    loginForm.form.reset();
  });
});

logout.addEventListener('click', (e) => {
  e.preventDefault();
  auth.signOut();
});

window.addEventListener('load', () => {
  content.appendChild(loginForm.content);
  content.appendChild(signupForm.content);
  content.appendChild(formTree.content);
  content.appendChild(newAccount.content);
  content.appendChild(navWrap);
  // content.appendChild(formTree.content);
  content.appendChild(treeWrapper);
  content.appendChild(branchWrapper);
});
