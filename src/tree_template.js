class Tree {
  constructor(treeTitle, treeDescription, treeColor) {
    const li = document.createElement('div');
    const title = document.createElement('h3');
    const description = document.createElement('p');
    const color = document.createElement('span');
    const remove = document.createElement('button');
    const update = document.createElement('button');
    const show = document.createElement('button');

    title.textContent = treeTitle;
    description.textContent = treeDescription;
    li.style.background = treeColor;
    li.className = 'tree';
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
    this.content = li;
  }
}

export default Tree;