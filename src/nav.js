let navWrap = document.createElement('div');
let logo = document.createElement('div');
let nav = document.createElement('nav');

let navcontent = ['Account', 'Logout', 'Create Tree', 'Login', 'Sign Up'];

for(let i = 0; i < navcontent.lenght; i++){
  let navLi = document.createElement('a');
  navLi.className = 'nav-item';
  navLi.id = navcontent[i]
  navLi.textContent = navcontent[i];
  navLi.setAttribute('data-target', `modal-${navcontent[i]}`);
  nav.appendChild(navLi);
}

navWrap.appendChild(logo);
navWrap.appendChild(nav);

export default navWrap;
