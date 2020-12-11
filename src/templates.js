import  format from 'date-fns/format';
class Branch {
  constructor(priority, notes, title, description, due_date){
    let bLi = document.createElement('div');
    let bTitle = document.createElement('h3');
    let bStatus = document.createElement('input');
    let statusText = document.createElement('span');
    let statusWrap = document.createElement('span');
    let bPriority = document.createElement('span');
    let bDes = document.createElement('p');
    let due = document.createElement('span');
    let bRemove = document.createElement('button');
    let bUpdate = document.createElement('button');
    let bNotes = document.createElement('p');
    let showMore = document.createElement('span');
    let desWrap = document.createElement('div');

    bStatus.type = 'checkbox';
    statusText.innerText = ' Mark as complete';
    bPriority.textContent = `Priority ${priority} `;
    bPriority.className = 'b-priority'
    bNotes.textContent = notes;
    bTitle.textContent = title;
    bDes.textContent = description;
    due.textContent = `Due Date: ${format(new Date(due_date), 'do MMMM yyyy')} `;
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
    bLi.appendChild(showMore)
    bLi.appendChild(desWrap);

    this.remove = bRemove;
    this.update = bUpdate;
    this.showmore = showMore;
    this.status = bStatus;
    this.des = desWrap;
    this.content = bLi;
  }
}

class Tree{
  constructor(treeTitle, treeDescription, treeColor){
    let li = document.createElement('div');
    let title = document.createElement('h3');
    let description = document.createElement('p');
    let color = document.createElement('span');
    let remove = document.createElement('button');
    let update = document.createElement('button');
    let show = document.createElement('button');

    title.textContent = treeTitle;
    description.textContent = treeDescription;
    li.style.background = treeColor;
    li.className = 'tree'
    remove.innerHTML = 'X';
    remove.classList.add('btn', 'danger');
    update.innerHTML = 'Update';
    update.classList.add('btn', 'primary');
    show.innerHTML = 'Show todos';
    show.classList.add('btn', 'primary');

    li.appendChild(title);
    li.appendChild(description);
    li.appendChild(color);
    li.appendChild(remove);
    li.appendChild(update);
    li.appendChild(show);

    this.remove = remove;
    this.update = update;
    this.show = show;
    this.content = li
  }
}

function Account() {
  let wrapper = document.createElement('div')
  let name = document.createElement('h4')
  let email = document.createElement('p')
  let closeBtn = document.createElement('button');

  this.email = email
  this.name = name
  email.textContent = this.emailValue;
  name.textContent = this.nameValue;
  closeBtn.textContent = 'X';
  closeBtn.classList.add('btn', 'danger');
  closeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    e.target.parentElement.style.display = 'none';
  })
  wrapper.className = 'modal';
  wrapper.style.display = 'none';

  wrapper.appendChild(closeBtn);
  wrapper.appendChild(name);
  wrapper.appendChild(email);

  this.content = wrapper;
}

const newAccount = new Account();

export { Branch, Tree, newAccount }