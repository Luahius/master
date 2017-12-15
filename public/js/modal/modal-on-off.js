let modal = document.getElementById('modal');
let modalClose = document.getElementById('modalClose');
let modalOnOff = () => {
  modal.classList.add('on');
  modalClose.addEventListener('click', () => {
    modal.classList.remove('on');
  })
}
