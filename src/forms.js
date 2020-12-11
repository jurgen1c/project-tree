class PForm {
  constructor(){
    let wrapper = document.createElement('div');
    let form = document.createElement('form');
    let tinput = document.createElement('input');
    let dinput = document.createElement('textarea');
    let cinput = document.createElement('input');
    let button = document.createElement('button');
    
    wrapper.id = "add-tree-form";

    tinput.type = 'text';
    tinput.name = 'title';
    tinput.placeholder = 'Tree Title';

    dinput.name = 'description';
    dinput.placeholder = 'Add a description about your tree';

    cinput.type = 'color';
    cinput.name = 'color';
    cinput.placeholder = 'Choose tree color';

    button.type = 'submit';
    button.innerHTML = 'Submit';

    form.appendChild(tinput);
    form.appendChild(dinput);
    form.appendChild(cinput);
    form.appendChild(button);

    wrapper.appendChild(form);

    this.form = form;
    this.content = wrapper;
  }
}
class BForm{
  constructor(){
    let options = ['high', 'medium', 'low'];

    let wrapper = document.createElement('div')
    let form = document.createElement('form');
    let tinput = document.createElement('input');
    let dinput = document.createElement('textarea');
    let ninput = document.createElement('textarea');
    let bselect = document.createElement('select');
    for(let op of options){
      let oWrap = document.createElement('option');
      oWrap.value = op;
      oWrap.textContent = op;
      bselect.appendChild(oWrap);
    }
    let input = document.createElement('input');
    let button = document.createElement('button');

    wrapper.id = "add-tree-form";

    bselect.name = 'priority';

    tinput.type = 'text';
    tinput.name = 'title';
    tinput.placeholder = 'Tree Title';

    dinput.name = 'description';
    dinput.placeholder = 'Add a description about your tree';

    input.type = 'date';
    input.name = 'due_date';

    ninput.name = 'notes';
    ninput.placeholder = 'Add notes...';

    button.type = 'submit';
    button.innerHTML = 'Submit';

    form.appendChild(tinput);
    form.appendChild(bselect);
    form.appendChild(dinput);
    form.appendChild(input);
    form.appendChild(ninput);
    form.appendChild(button);

    wrapper.appendChild(form);

    this.form = form;
    this.content = wrapper;
  }
}
class UForm{
  constructor(action){
    let wrapper = document.createElement('div');
    const form = document.createElement('form');
    let email = document.createElement('input');
    let pass = document.createElement('input');
    let btn = document.createElement('button');
    let closeBtn = document.createElement('button');


    email.type = 'text';
    email.name = 'email';
    pass.type = 'text';
    pass.name = 'password';
    btn.type = 'submit';
    btn.textContent = action;
    closeBtn.type = 'button';
    closeBtn.textContent = 'X';

    closeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.target.parentElement.style.display = 'none';
    })

    wrapper.appendChild(closeBtn);
    form.appendChild(email);
    form.appendChild(pass);
    form.appendChild(btn);

    wrapper.className = 'modal';

    wrapper.appendChild(form);
    this.form = form;
    this.content = wrapper;
  }
}

const loginForm = new UForm('Login');
const signupForm = new UForm('Sign Up');

export {PForm, BForm, loginForm, signupForm};