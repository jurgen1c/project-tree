let navWrap = document.createElement('div');
let logo = document.createElement('div');
let nav = document.createElement('nav');

let loggedIn = ['Account', 'Logout', 'Create Tree'];
let loggedOut = ['Login', 'Sign Up']

for(let i = 0; i < loggedIn.lenght; i++){
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
  navLi.id = loggedOut[i]
  navLi.textContent = loggedOut[i];
  navLi.setAttribute('data-target', `modal-${loggedOut[i]}`);
  nav.appendChild(navLi);
}

let loggedItems = document.querySelectorAll('item-logged');
let notlogged = document.querySelectorAll('item-notlogged');

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

export { navWrap, navControl};
