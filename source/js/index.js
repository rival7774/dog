const btnBurger = document.querySelector('.header__btn-menu--js');
const header = document.querySelector('.header--js');

const CLASS_OPEN_MENU = 'header--open-menu';

btnBurger.addEventListener('click', (e) => {

  if (header.classList.contains(CLASS_OPEN_MENU)) {
    header.classList.remove(CLASS_OPEN_MENU);
    return;
  }

  header.classList.add(CLASS_OPEN_MENU);
});
