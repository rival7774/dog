const page = document.querySelector('.index-js');

if (page) {
  const SELECTOR_LIST = 'types__list--js';
  const SELECTOR_ITEM = 'types__item--js';
  const SELECTOR_ITEM_VISIBLE = 'types__item--visible';

  const list = document.querySelector(`.${SELECTOR_LIST}`);

  list.addEventListener('mouseover', onMouseoverList(), true);

  function onMouseoverList() {
    let prevItem;

    return function (e) {
      const target = e.target;

      if (target.closest(`.${SELECTOR_ITEM}`) && target.tagName !== 'IMG') {
        const item = target.closest(`.${SELECTOR_ITEM}`);

        item.classList.add(SELECTOR_ITEM_VISIBLE);

        if (prevItem && prevItem !== item) {
          prevItem.classList.remove(SELECTOR_ITEM_VISIBLE);
        }

        prevItem = item;
      }
    };
  }
}

