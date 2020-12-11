import { showModal } from './modal'
import { loginForm, signupForm } from './forms';
import { formTree } from './tree';
import {newAccount} from './templates'

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

login.textContent = 'Login';
signup.textContent = 'Sign Up';
logout.textContent = 'Logout';
create.textContent = 'Create New Project';
account.textContent = 'Account';

login.addEventListener('click', (e) => {
  e.preventDefault();
  showModal(loginForm.content);
})

signup.addEventListener('click', (e) => {
  e.preventDefault();
  showModal(signupForm.content);
})

create.addEventListener('click', (e) => {
  e.preventDefault();
  showModal(formTree.content)
})

account.addEventListener('click', (e) => {
  e.stopPropagation();
  showModal(newAccount.content)
})

nav.appendChild(login);
nav.appendChild(signup);
nav.appendChild(account);
nav.appendChild(create);
nav.appendChild(logout);

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

logo.textContent = 'Fractal Tree';

navWrap.appendChild(logo);
navWrap.appendChild(nav);
navWrap.className = 'nav'

export { navWrap, navControl, logout };
