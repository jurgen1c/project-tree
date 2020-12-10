import {db} from './fire';
import  format from 'date-fns/format';
import { PForm, BForm } from './forms'
import { showModal, showDes } from './modal'

const treeList = document.createElement('div');
const branchList = document.createElement('div');
const branchWrapper = document.createElement('div');
const treeWrapper = document.createElement('div');

const formTree = new PForm();
const formBranch = new BForm();
const updateTree = new PForm();
const updateBranch = new BForm();

function treeUpdate(el, id){
  el.appendChild(updateTree.content)
  updateTree.form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('trees').doc(id).update({
      title: updateTree.form.title.value,
      description: updateTree.form.description.value,
      color: updateTree.form.color.value
    })
    el.removeChild(updateTree.content);
  })
}

function branchUpdate(el, id){
  el.appendChild(updateBranch.content)
  updateBranch.form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('branches').doc(id).update({
      title: updateBranch.form.title.value,
      description: updateBranch.form.description.value,
      due_date: updateBranch.form.due_date.value,
      priority: updateBranch.form.priority.value,
      notes: updateBranch.form.notes.value
    })
    el.removeChild(updateBranch.content);
  })
}

function renderBranches(branch){
  let bLi = document.createElement('li');
  let bTitle = document.createElement('h3');
  let bStatus = document.createElement('input');
  let bPriority = document.createElement('span');
  let bDes = document.createElement('p');
  let due = document.createElement('span');
  let bRemove = document.createElement('button');
  let bUpdate = document.createElement('button');
  let bNotes = document.createElement('p');
  let showMore = document.createElement('span')

  let desWrap = document.createElement('div');

  bLi.setAttribute('data-id', branch.id);
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
  bLi.appendChild(desWrap);

  showMore.addEventListener('click', (e) => {
    showDes(desWrap);
    e.stopPropagation();
  })

  bRemove.addEventListener('click', (e) => {
    e.stopPropagation();
    let id = e.target.parentElement.getAttribute('data-id');
    db.collection('branches').doc(id).delete();
  })
  bUpdate.addEventListener('click', (e) => {
    e.stopPropagation();
    let id = e.target.parentElement.getAttribute('data-id');
    branchUpdate(li, id);
  })
  bStatus.addEventListener('change', () => {
    if(this.checked){
      db.collection('branches').doc(branch.id).update({
          status: true
      });
    }else{
      db.collection('branches').doc(branch.id).update({
        status: false
      });
    }
  })
  branchList.appendChild(bLi);
  console.log(branchList)
}

function showBranches(parent, id){
  branchList.innerHTML = '';
  db.collection('branches').where('tree_id', '==', id).orderBy('due_date').onSnapshot(bsnapshot => {
    let bchanges = bsnapshot.docChanges();
    bchanges.forEach(bchange => {
      if(bchange.type == 'added'){
        renderBranches(bchange.doc);
      }else if(bchange.type == 'modified'){
        renderBranches(bchange.doc);
      }else if(bchange.type == 'removed'){
        let li = branchList.querySelector('[data-id=' + bchange.doc.id + ']');
        branchList.removeChild(li);
      }
    })
  }, err => {
    console.log(err.message)
  })
  parent.appendChild(formBranch.content);
  branchWrapper.appendChild(branchList);
}

function renderTree(doc){
  let li = document.createElement('li');
  let title = document.createElement('h3');
  let description = document.createElement('p');
  let color = document.createElement('span');
  let remove = document.createElement('button');
  let update = document.createElement('button');
  let show = document.createElement('button');

  li.setAttribute('data-id', doc.id);
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

  remove.addEventListener('click', (e) => {
    e.stopPropagation();
    let id = e.target.parentElement.getAttribute('data-id');
    db.collection('trees').doc(id).delete();
  })
  update.addEventListener('click', (e) => {
    e.stopPropagation();
    let id = e.target.parentElement.getAttribute('data-id');
    treeUpdate(li, id);
  })
  show.addEventListener('click', (e) => {
    e.stopPropagation();
    let id = e.target.parentElement.getAttribute('data-id');
    showBranches(li, id)
  })

  treeList.appendChild(li);
}

const formEvents = (user) => {
  // Saving Data------
  formBranch.form.addEventListener('submit', (e) => {
    e.preventDefault();
    let id = e.target.parentElement.getAttribute('data-id');
    db.collection('branches').add({
      title: formBranch.form.title.value,
      priority: formBranch.form.priority.value,
      description: formBranch.form.description.value,
      status: false,
      due_date: formBranch.form.due_date.value,
      notes: formBranch.form.notes.value,
      tree_id: id
    }).then(() => {
      formBranch.form.reset();
    }).catch(err => {
      console.log(err.message);
    })
  })

  formTree.form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('trees').add({
      title: formTree.form.title.value,
      description: formTree.form.description.value,
      color: formTree.form.color.value,
      user_id: user.uid
    }).then(() => {
      formTree.form.reset();
    }).catch(err => {
      console.log(err.message);
    })
  })
}

treeWrapper.appendChild(formTree.content);
treeWrapper.appendChild(treeList);

export  {renderTree, formEvents, branchWrapper, treeWrapper};