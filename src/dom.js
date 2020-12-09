class PForm {
  constructor(){
    let wrapper = document.createElement('form');
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

    cinput.type = 'text';
    cinput.name = 'color';
    cinput.placeholder = 'Choose tree color';

    button.type = 'submit';
    button.innerHTML = 'Submit';

    wrapper.appendChild(tinput);
    wrapper.appendChild(dinput);
    wrapper.appendChild(cinput);
    wrapper.appendChild(button);

    this.content = wrapper;
  }
}
class BForm{
  constructor(){
    let wrapper = document.createElement('form');
    let tinput = document.createElement('input');
    let dinput = document.createElement('textarea');
    let input = document.createElement('input');
    let button = document.createElement('button');

    wrapper.id = "add-tree-form";

    tinput.type = 'text';
    tinput.name = 'title';
    tinput.placeholder = 'Tree Title';

    dinput.name = 'description';
    dinput.placeholder = 'Add a description about your tree';

    input.type = 'date';
    input.name = 'due_date';

    button.type = 'submit';
    button.innerHTML = 'Submit';

    wrapper.appendChild(tinput);
    wrapper.appendChild(dinput);
    wrapper.appendChild(input);
    wrapper.appendChild(button);

    this.content = wrapper;
  }
}

export {PForm, BForm};