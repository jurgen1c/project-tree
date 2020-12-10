import { showModal } from './modal'
import { loginForm, signupForm } from './forms';

let navWrap = document.createElement('div');
let logo = document.createElement('div');
let nav = document.createElement('nav');
let login = document.createElement('a');
let account = document.createElement('a');
let logout = document.createElement('a');
let create = document.createElement('a');
let signup = document.createElement('a');

login.className = 'item-notlogged';
account.className = 'item-logged';
logout.className = 'item-logged';
create.className = 'item-logged';
signup.className = 'item-notlogged';

let loggedIn = ['Account', 'Logout', 'Create'];
let loggedOut = ['Login', 'Sign Up']

login.textContent = 'Login';
signup.textContent = 'Sign Up';
logout.textContent = 'Logout';
create.textContent = 'Create New Tree';
account.textContent = 'Account';

login.addEventListener('click', (e) => {
  e.preventDefault();
  showModal(loginForm.content);
})

signup.addEventListener('click', (e) => {
  e.preventDefault();
  showModal(signupForm.content);
})

nav.appendChild(login);
nav.appendChild(signup);
nav.appendChild(account);
nav.appendChild(create);
nav.appendChild(logout);


/* for(let i = 0; i < loggedIn.lenght; i++){
  let navLi = document.createElement('a');
  navLi.className = 'item-logged';
  navLi.id = loggedIn[i]
  navLi.textContent = loggedIn[i];
  navLi.setAttribute('data-target', `modal-${loggedIn[i]}`);
  nav.appendChild(navLi);
}

for(let i = 0; i < loggedOut.length; i++){
  let navLi = document.createElement('a');
  navLi.className = 'item-notlogged';
  navLi.id = loggedOut[i].toLowerCase().split(/\W/).join('-');
  navLi.textContent = loggedOut[i];
  navLi.setAttribute('data-target', `modal-${loggedOut[i]}`);
  nav.appendChild(navLi);
} */

let loggedItems = [logout, account, create]
let notlogged = [login, signup]

function navControl(user){
  if(user){
    loggedItems.forEach(item => {item.style.display = 'block'});
    notlogged.forEach(item => {item.style.display = 'none'});
    //show links
  }else{
    loggedItems.forEach(item => {item.style.display = 'none'});
    notlogged.forEach(item => {item.style.display = 'block'});
    //hide links
  }
}

navWrap.appendChild(logo);
navWrap.appendChild(nav);
navWrap.className = 'nav'

export { navWrap, navControl, logout };
