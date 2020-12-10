
/* DB Rules
match /tress/{treeId} {
  allow read, write: if request.auth.uid != null;
}
match/trees/{treeId} {
  allow create: if request.auth.uid != null;
  allow read: if request.auth.uid == user_id;
}
 */


const signupForm = document.querySelector('#signup-form');
const logout = document.querySelector('#Logout');
const signinForm = document.querySelector('#login-form');



