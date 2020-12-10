function showModal(el){
  el.style.display = 'block';
}

function showDes(el){
  if(el.style.display == 'none'){
    el.style.display = 'block';
  }else{
    el.style.display = 'none';
  }
}

export { showModal, showDes }