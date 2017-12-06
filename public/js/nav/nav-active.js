let navActive = () => {
  let currentUrl = document.getElementById('diffUrl').dataset.url;
  let navList = document.getElementsByClassName('nav-list');

  for(nav of navList) {
    if(currentUrl == nav.dataset.url) nav.classList.add('active');
    else nav.classList.remove('active');
  }
}
navActive();