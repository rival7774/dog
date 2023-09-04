const SELECTOR_LIST = 'types__list--js';
const SELECTOR_ITEM = 'types__item--js';
const SELECTOR_ITEM_VISIBLE = 'types__item--visible';

const list = document.querySelector(`.${SELECTOR_LIST}`);

list.addEventListener('mouseover', onMouseoverList, true);

function onMouseoverList(e) {
  const target = e.target;
  const prevTarget = e.relatedTarget;

  if (target.closest(`.${SELECTOR_ITEM}`)) {
    const item = target.closest(`.${SELECTOR_ITEM}`);

    item.classList.add(SELECTOR_ITEM_VISIBLE);

    if (prevTarget &&
      prevTarget.closest(`.${SELECTOR_ITEM}`) &&
      prevTarget.closest(`.${SELECTOR_ITEM}`) !== item) {

      prevTarget.closest(`.${SELECTOR_ITEM}`)
                .classList
                .remove(SELECTOR_ITEM_VISIBLE);
    }
  }
}
