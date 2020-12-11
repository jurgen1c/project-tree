import  format from 'date-fns/format';

class Branch {
  constructor(priority, notes, title, description, due_date){
    let bLi = document.createElement('li');
    let bTitle = document.createElement('h3');
    let bStatus = document.createElement('input');
    let bPriority = document.createElement('span');
    let bDes = document.createElement('p');
    let due = document.createElement('span');
    let bRemove = document.createElement('button');
    let bUpdate = document.createElement('button');
    let bNotes = document.createElement('p');
    let showMore = document.createElement('span');
    let desWrap = document.createElement('div');

    bStatus.type = 'checkbox';
    bPriority.textContent = `Priority ${priority}`;
    bNotes.textContent = notes;
    bTitle.textContent = title;
    bDes.textContent = description;
    due.textContent = `Due Date: ${format(new Date(due_date), 'do MMMM yyyy')}`;
    bRemove.innerHTML = 'X';
    bUpdate.innerHTML = 'Update';
    showMore.innerHTML = 'show more &#65088;';
    bLi.className = 'branch';

    desWrap.appendChild(bDes);
    desWrap.appendChild(bNotes);
    desWrap.style.display = 'none';

    bLi.appendChild(bStatus);
    bLi.appendChild(bTitle);
    bLi.appendChild(showMore)
    bLi.appendChild(bPriority);
    bLi.appendChild(due);
    bLi.appendChild(bRemove);
    bLi.appendChild(bUpdate);
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
    let li = document.createElement('li');
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
    update.innerHTML = 'Update';
    show.innerHTML = 'Show todos';

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

export { Branch, Tree }