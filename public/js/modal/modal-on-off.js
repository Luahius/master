let modal = document.getElementById('modal');
let modalOnOff = () => {
  modal.classList.add('on');
  modal.addEventListener('click', () => {
    modal.classList.remove('on');
  })
}
