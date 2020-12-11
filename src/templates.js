import format from 'date-fns/format';

class Branch {
  constructor(priority, notes, title, description, dueDate) {
    const bLi = document.createElement('div');
    const bTitle = document.createElement('h3');
    const bStatus = document.createElement('input');
    const statusText = document.createElement('span');
    const statusWrap = document.createElement('span');
    const bPriority = document.createElement('span');
    const bDes = document.createElement('p');
    const due = document.createElement('span');
    const bRemove = document.createElement('button');
    const bUpdate = document.createElement('button');
    const bNotes = document.createElement('p');
    const showMore = document.createElement('span');
    const desWrap = document.createElement('div');

    bStatus.type = 'checkbox';
    statusText.innerText = ' Mark as complete';
    bPriority.textContent = `Priority ${priority} `;
    bPriority.className = 'b-priority';
    bNotes.textContent = notes;
    bTitle.textContent = title;
    bDes.textContent = description;
    due.textContent = `Due Date: ${format(new Date(dueDate), 'do MMMM yyyy')} `;
    bRemove.innerHTML = 'X';
    bRemove.classList.add('btn', 'danger');
    bUpdate.innerHTML = 'Update';
    bUpdate.classList.add('btn', 'primary');
    showMore.innerHTML = '&#65088;';
    showMore.className = 'show-more';
    bLi.className = 'branch';

    desWrap.appendChild(bDes);
    desWrap.appendChild(bNotes);
    desWrap.style.display = 'none';

    statusWrap.appendChild(bStatus);
    statusWrap.appendChild(statusText);

    bLi.appendChild(statusWrap);
    bLi.appendChild(bTitle);
    bLi.appendChild(bPriority);
    bLi.appendChild(due);
    bLi.appendChild(bRemove);
    bLi.appendChild(bUpdate);
    bLi.appendChild(showMore);
    bLi.appendChild(desWrap);

    this.remove = bRemove;
    this.update = bUpdate;
    this.showmore = showMore;
    this.status = bStatus;
    this.des = desWrap;
    this.content = bLi;
  }
}

function Account() {
  const wrapper = document.createElement('div');
  const name = document.createElement('h4');
  const email = document.createElement('p');
  const closeBtn = document.createElement('button');

  this.email = email;
  this.name = name;
  email.textContent = this.emailValue;
  name.textContent = this.nameValue;
  closeBtn.textContent = 'X';
  closeBtn.classList.add('btn', 'danger');
  closeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    e.target.parentElement.style.display = 'none';
  });
  wrapper.className = 'modal';
  wrapper.style.display = 'none';

  wrapper.appendChild(closeBtn);
  wrapper.appendChild(name);
  wrapper.appendChild(email);

  this.content = wrapper;
}

function showElement(el) {
  if (el.style.display === 'none') {
    el.style.display = 'block';
  } else {
    el.style.display = 'none';
  }
}

const newAccount = new Account();

export { Branch, newAccount, showElement };