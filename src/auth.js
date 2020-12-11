
/* DB Rules
match /tress/{treeId} {
  allow read, write: if request.auth.uid != null;
}
match/trees/{treeId} {
  allow create: if request.auth.uid != null;
  allow read: if request.auth.uid == user_id;
}
 */

/* 
const signupForm = document.querySelector('#signup-form');
const logout = document.querySelector('#Logout');
const signinForm = document.querySelector('#login-form');

let li = document.createElement('li');
  let title = document.createElement('h3');
  let description = document.createElement('p');
  let color = document.createElement('span');
  let remove = document.createElement('button');
  let update = document.createElement('button');
  let show = document.createElement('button');

  title.textContent = doc.data().title;
  description.textContent = doc.data().description;
  color.textContent = doc.data().color;
  remove.innerHTML = 'X';
  update.innerHTML = 'Update';
  show.innerHTML = 'Show todos';

  li.appendChild(title);
  li.appendChild(description);
  li.appendChild(color);
  li.appendChild(remove);
  li.appendChild(update);
  li.appendChild(show);


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

  bPriority.textContent = branch.data().priority;
  bNotes.textContent = branch.data().notes;
  bTitle.textContent = branch.data().title;
  bDes.textContent = branch.data().description;
  due.textContent = branch.data().due_date;
  due.textContent = format(new Date(due.textContent), 'do MMMM yyyy')
  
  bRemove.innerHTML = 'X';
  bUpdate.innerHTML = 'Update';
  showMore.innerHTML = 'show more &#65088;';

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
  bLi.appendChild(desWrap); */

