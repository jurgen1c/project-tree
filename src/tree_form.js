class PForm {
  constructor() {
    const wrapper = document.createElement('div');
    const form = document.createElement('form');
    const tinput = document.createElement('input');
    const dinput = document.createElement('textarea');
    const cinput = document.createElement('input');
    const button = document.createElement('button');
    const closeBtn = document.createElement('button');

    wrapper.id = 'add-tree-form';

    tinput.type = 'text';
    tinput.name = 'title';
    tinput.placeholder = 'Tree Title';

    dinput.name = 'description';
    dinput.placeholder = 'Add a description about your tree';

    cinput.type = 'color';
    cinput.name = 'color';
    cinput.placeholder = 'Choose tree color';

    button.type = 'submit';
    button.innerHTML = 'Create';
    closeBtn.type = 'button';
    closeBtn.textContent = 'X';

    closeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.target.parentElement.style.display = 'none';
    });

    wrapper.appendChild(closeBtn);

    form.appendChild(tinput);
    form.appendChild(dinput);
    form.appendChild(cinput);
    form.appendChild(button);

    wrapper.appendChild(form);
    wrapper.className = 'modal';
    wrapper.style.display = 'none';

    this.form = form;
    this.content = wrapper;
  }
}

export default PForm;