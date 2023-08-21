const btnBurger = document.querySelector('.header__btn-menu--js');

const CLASS_OPEN_MENU = 'header__btn-menu--open';

btnBurger.addEventListener('click', (e) => {
  const target = e.currentTarget;

  if (target.classList.contains(CLASS_OPEN_MENU)) {
    console.log(1);
    target.classList.remove(CLASS_OPEN_MENU);
    return;
  }

  target.classList.add(CLASS_OPEN_MENU);
});
