import { db } from './fire';
import PForm from './tree_form';
import BForm from './branch_form';
import { Branch, showElement } from './templates';
import Tree from './tree_template';

const treeList = document.createElement('div');
const branchList = document.createElement('div');
const branchWrapper = document.createElement('div');
const treeWrapper = document.createElement('div');
const treeHeader = document.createElement('h2');
const branchHeader = document.createElement('h2');
const viewAll = document.createElement('button');

const formTree = new PForm();
const formBranch = new BForm();
const updateTree = new PForm();
const updateBranch = new BForm();

branchWrapper.className = 'branch-wrap';
branchList.className = 'branch-list';
treeWrapper.className = 'tree-list';
treeHeader.textContent = 'Your Projects';
branchHeader.textContent = 'Project Todos';
viewAll.type = 'button';
viewAll.classList.add('btn', 'primary');
viewAll.textContent = 'View All Todos';

treeWrapper.appendChild(treeHeader);
treeWrapper.appendChild(viewAll);
branchWrapper.appendChild(branchList);

function treeUpdate(el, id) {
  el.appendChild(updateTree.content);
  updateTree.form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('trees').doc(id).update({
      title: updateTree.form.title.value,
      description: updateTree.form.description.value,
      color: updateTree.form.color.value,
    });
    el.removeChild(updateTree.content);
  });
}

function branchUpdate(el, id) {
  el.appendChild(updateBranch.content);
  updateBranch.form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('branches').doc(id).update({
      title: updateBranch.form.title.value,
      description: updateBranch.form.description.value,
      due_date: updateBranch.form.due_date.value,
      priority: updateBranch.form.priority.value,
      notes: updateBranch.form.notes.value,
    });
    el.removeChild(updateBranch.content);
  });
}

function renderBranches(branch) {
  if (branch) {
    const newBranch = new Branch(
      branch.data().priority,
      branch.data().notes,
      branch.data().title,
      branch.data().description,
      branch.data().due_date,
    );

    newBranch.content.setAttribute('data-id', branch.id);

    newBranch.showmore.addEventListener('click', (e) => {
      e.stopPropagation();
      showElement(newBranch.des);
    });

    newBranch.remove.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = e.target.parentElement.getAttribute('data-id');
      db.collection('branches').doc(id).delete();
    });
    newBranch.update.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = e.target.parentElement.getAttribute('data-id');
      branchUpdate(newBranch.content, id);
    });
    newBranch.status.addEventListener('change', () => {
      if (this.checked) {
        newBranch.content.style.background = 'lightgreen';
        db.collection('branches').doc(branch.id).update({
          status: true,
        });
      } else {
        newBranch.content.style.background = 'lightcoral';
        db.collection('branches').doc(branch.id).update({
          status: false,
        });
      }
    });
    branchList.appendChild(newBranch.content);
  } else {
    const branchMessage = document.createElement('h2');
    branchMessage.textContent = 'No Todos, create one from projct list!';
    branchList.appendChild(branchMessage);
  }
}
function addAll(user) {
  branchList.innerHTML = '';
  const allHeader = document.createElement('h1');
  allHeader.textContent = 'All Todos';
  branchList.appendChild(allHeader);
  (() => {
    db.collection('branches').where('user_id', '==', user.uid).orderBy('due_date').onSnapshot(bsnapshot => {
      const bchanges = bsnapshot.docChanges();
      bchanges.forEach(bchange => {
        if (bchange.type === 'added') {
          renderBranches(bchange.doc);
        } else if (bchange.type === 'modified') {
          renderBranches(bchange.doc);
        } else if (bchange.type === 'removed') {
          const li = branchList.querySelector(`[data-id=${bchange.doc.id}]`);
          branchList.removeChild(li);
        }
      });
    });
  })();
}

function showBranches(parent, id) {
  branchList.innerHTML = '';
  db.collection('branches').where('tree_id', '==', id).orderBy('due_date').onSnapshot(bsnapshot => {
    const bchanges = bsnapshot.docChanges();
    bchanges.forEach(bchange => {
      if (bchange.type === 'added') {
        renderBranches(bchange.doc);
      } else if (bchange.type === 'modified') {
        renderBranches(bchange.doc);
      } else if (bchange.type === 'removed') {
        const li = branchList.querySelector(`[data-id=${bchange.doc.id}]`);
        branchList.removeChild(li);
      }
    });
  });
  branchList.appendChild(branchHeader);
  parent.appendChild(formBranch.content);
  // branchWrapper.appendChild(branchList);
}

function renderTree(doc) {
  if (doc) {
    const newTree = new Tree(
      doc.data().title,
      doc.data().description,
      doc.data().color,
    );

    newTree.content.setAttribute('data-id', doc.id);

    newTree.remove.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = e.target.parentElement.getAttribute('data-id');
      db.collection('trees').doc(id).delete();
    });
    newTree.update.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = e.target.parentElement.getAttribute('data-id');
      treeUpdate(newTree.content, id);
    });
    newTree.show.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = e.target.parentElement.getAttribute('data-id');
      showBranches(newTree.content, id);
    });

    treeList.appendChild(newTree.content);
  } else {
    const treeMessage = document.createElement('h2');
    treeMessage.textContent = 'No Projects, create one from the navbar.';
    treeList.appendChild(treeMessage);
  }
}

const formEvents = (user) => {
  // Saving Data------
  formBranch.form.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = e.target.parentElement.getAttribute('data-id');
    db.collection('branches').add({
      title: formBranch.form.title.value,
      priority: formBranch.form.priority.value,
      description: formBranch.form.description.value,
      status: false,
      due_date: formBranch.form.due_date.value,
      notes: formBranch.form.notes.value,
      tree_id: id,
      user_id: user.uid,
    }).then(() => {
      formBranch.form.reset();
    });
  });

  formTree.form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('trees').add({
      title: formTree.form.title.value,
      description: formTree.form.description.value,
      color: formTree.form.color.value,
      user_id: user.uid,
    }).then(() => {
      formTree.form.reset();
    });
  });

  viewAll.addEventListener('click', (e) => {
    e.stopPropagation();
    addAll(user);
  });

  addAll(user);
};

// treeWrapper.appendChild(formTree.content);
treeWrapper.appendChild(treeList);

export {
  renderTree, formEvents, branchWrapper, treeWrapper, formTree, treeList,
};