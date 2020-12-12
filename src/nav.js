import { loginForm, signupForm } from './user_form';
import formTree from './tree';
import { newAccount, showElement } from './templates';

const navWrap = document.createElement('div');
const logo = document.createElement('div');
const nav = document.createElement('nav');
const login = document.createElement('a');
const account = document.createElement('a');
const logout = document.createElement('a');
const create = document.createElement('a');
const signup = document.createElement('a');

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
  showElement(loginForm.content);
});

signup.addEventListener('click', (e) => {
  e.preventDefault();
  showElement(signupForm.content);
});

create.addEventListener('click', (e) => {
  e.preventDefault();
  showElement(formTree.content);
});

account.addEventListener('click', (e) => {
  e.stopPropagation();
  showElement(newAccount.content);
});

nav.appendChild(login);
nav.appendChild(signup);
nav.appendChild(account);
nav.appendChild(create);
nav.appendChild(logout);

const loggedItems = [logout, account, create];
const notlogged = [login, signup];

function navControl(user) {
  if (user) {
    loggedItems.forEach(item => { item.style.display = 'block'; });
    notlogged.forEach(item => { item.style.display = 'none'; });
    // show links
  } else {
    loggedItems.forEach(item => { item.style.display = 'none'; });
    notlogged.forEach(item => { item.style.display = 'block'; });
    // hide links
  }
}

logo.textContent = 'Fractal Tree';

navWrap.appendChild(logo);
navWrap.appendChild(nav);
navWrap.className = 'nav';

export {
  navWrap, navControl, logout,
};
