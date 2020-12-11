import {db} from './fire';
import { PForm, BForm } from './forms'
import { showDes } from './modal'
import { Branch, Tree } from './templates'

const treeList = document.createElement('div');
const branchList = document.createElement('div');
const branchWrapper = document.createElement('div');
const treeWrapper = document.createElement('div');

const formTree = new PForm();
const formBranch = new BForm();
const updateTree = new PForm();
const updateBranch = new BForm();

branchWrapper.className = 'branch-wrap';
branchList.className = 'branch-list';
treeWrapper.className = 'tree-list';

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
  const newBranch = new Branch(
    branch.data().priority,
    branch.data().notes,
    branch.data().title,
    branch.data().description,
    branch.data().due_date
  )

  newBranch.content.setAttribute('data-id', branch.id);

  newBranch.showmore.addEventListener('click', (e) => {
    e.stopPropagation();
    showDes(newBranch.des);
  })

  newBranch.remove.addEventListener('click', (e) => {
    e.stopPropagation();
    let id = e.target.parentElement.getAttribute('data-id');
    db.collection('branches').doc(id).delete();
  })
  newBranch.update.addEventListener('click', (e) => {
    e.stopPropagation();
    let id = e.target.parentElement.getAttribute('data-id');
    branchUpdate(li, id);
  })
  newBranch.status.addEventListener('change', () => {
    if(this.checked){
      newBranch.content.style.background = 'lightgreen';
      db.collection('branches').doc(branch.id).update({
          status: true
      });
    }else{
      newBranch.content.style.background = 'lightcoral';
      db.collection('branches').doc(branch.id).update({
        status: false
      });
    }
  })
  branchList.appendChild(newBranch.content);
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
  const newTree = new Tree(
    doc.data().title,
    doc.data().description,
    doc.data().color
  )

  newTree.content.setAttribute('data-id', doc.id);

  newTree.remove.addEventListener('click', (e) => {
    e.stopPropagation();
    let id = e.target.parentElement.getAttribute('data-id');
    db.collection('trees').doc(id).delete();
  })
  newTree.update.addEventListener('click', (e) => {
    e.stopPropagation();
    let id = e.target.parentElement.getAttribute('data-id');
    treeUpdate(newTree.content, id);
  })
  newTree.show.addEventListener('click', (e) => {
    e.stopPropagation();
    let id = e.target.parentElement.getAttribute('data-id');
    showBranches(newTree.content, id)
  })

  treeList.appendChild(newTree.content);
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