function showModal(el){
  el.style.display = 'block';
}

const windowEvents = (el) =>{
  window.onclick = (event, el) =>  {
    if (event.target == el) {
      el.style.display = "none";
    }
  }
}

function showDes(el){
  if(el.style.display == 'none'){
    el.style.display = 'block';
  }else{
    el.style.display = 'none';
  }
}

export {showModal, showDes, windowEvents}