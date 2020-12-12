class UForm {
  constructor(action) {
    const wrapper = document.createElement('div');
    const form = document.createElement('form');
    const email = document.createElement('input');
    const pass = document.createElement('input');
    const btn = document.createElement('button');
    const closeBtn = document.createElement('button');
    if (action === 'Sign Up') {
      const userName = document.createElement('input');
      userName.placeholder = 'User Name';
      form.appendChild(userName);
    }

    email.type = 'text';
    email.name = 'email';
    email.placeholder = 'Email';
    pass.type = 'text';
    pass.name = 'password';
    pass.placeholder = 'Password';
    btn.type = 'submit';
    btn.textContent = action;
    closeBtn.type = 'button';
    closeBtn.textContent = 'X';

    closeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.target.parentElement.style.display = 'none';
    });

    wrapper.appendChild(closeBtn);
    form.appendChild(email);
    form.appendChild(pass);
    form.appendChild(btn);

    wrapper.className = 'modal';
    wrapper.style.display = 'none';

    wrapper.appendChild(form);
    this.form = form;
    this.content = wrapper;
  }
}

const loginForm = new UForm('Login');
const signupForm = new UForm('Sign Up');

export { loginForm, signupForm };