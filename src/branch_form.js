class BForm {
  constructor() {
    const options = ['high', 'medium', 'low'];

    const wrapper = document.createElement('div');
    const header = document.createElement('h5');
    const form = document.createElement('form');
    const tinput = document.createElement('input');
    const dinput = document.createElement('textarea');
    const ninput = document.createElement('textarea');
    const bselect = document.createElement('select');
    for (let i = 0; i < options.length; i += 1) {
      const oWrap = document.createElement('option');
      oWrap.value = options[i];
      oWrap.textContent = options[i];
      bselect.appendChild(oWrap);
    }
    const input = document.createElement('input');
    const button = document.createElement('button');

    wrapper.id = 'add-tree-form';

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
    header.textContent = 'New Todo';

    wrapper.appendChild(header);

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

export default BForm;