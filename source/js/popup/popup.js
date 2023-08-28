const btnApplication = document.querySelector('.btn-application-js');
const popupApplication = document.querySelector('.popup-application-js');
const popupCall = document.querySelector('.popup-call-js');
const btnCall = document.querySelector('.btn-call-js');

const CLASS_HIDDEN = 'hide-completely';
const CLASS_BTN_CLOSE = 'btn-close-popup-js';

btnCall.addEventListener('click', onClickBtn(popupCall));
btnApplication.addEventListener('click', onClickBtn(popupApplication));

function onClickBtn(popup) {
  function closePopup() {
    popup.classList.add(CLASS_HIDDEN);
    popup.removeEventListener('click', onClickPopup);
    popup.removeEventListener('keydown', onKeyPopup);
  }

  function onClickPopup(e) {
    const target = e.target;
    if (target.contains(popup) || target.closest(`.${CLASS_BTN_CLOSE}`)) {
      closePopup();
    }
  }

  function onKeyPopup(e) {
    const target = e.target;
    const key = e.key;

    if (key === 'Escape' || (key === ' ' || key === 'Enter') && target.closest(`.${CLASS_BTN_CLOSE}`)) {
      closePopup();
    }
  }

  return function () {
    popup.classList.remove(CLASS_HIDDEN);
    popup.focus();
    popup.addEventListener('click', onClickPopup);
    popup.addEventListener('keydown', onKeyPopup);
  };
}
