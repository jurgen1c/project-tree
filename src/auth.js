/* DB Rules
match /tress/{treeId} {
  allow read, write: if request.auth.uid != null;
}
 */
auth.onAuthStateChanged(user => {
  if (user){
    console.log('user logged in')
  }else{
    console.log('user logged out')
  }
})

const signupForm = document.querySelector('#signup-form');
const logout = document.querySelector('#Logout');
const signinForm = document.querySelector('#login-form');

signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = signupForm['signup-email'].value;
  const password = signupForm['signup-pass'].value;
  auth.createUserWithEmailAndPassword(email, password).then(cred => {

  })
})

signinForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = signinForm['login-email'].value
  const password = signinForm['login-pass'].value
  auth.signInWithEmailAndPassword(email, password).then(cred => {
    console.log(cred.user);
  })
})

logout.addEventListener('click', (e) => {
  e.preventDefault();
  auth.signout()
})

