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
    let options = ['high', 'medium', 'low'];
    let wrapper = document.createElement('form');
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

    wrapper.appendChild(tinput);
    wrapper.appendChild(bselect);
    wrapper.appendChild(dinput);
    wrapper.appendChild(input);
    wrapper.appendChild(ninput);
    wrapper.appendChild(button);

    this.content = wrapper;
  }
}

class UForm{
  constructor(){

  }
}

export {PForm, BForm, UForm};