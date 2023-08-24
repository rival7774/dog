const options = ['мама', 'папа', 'сестра', 'жена', 'osuefosifjm', 'sedgsjirhgiuagh airghj oiajrg ajoi gja', 'shsfasf', 'hddjsdgs', 'gdhsg', 'asdasgaf', 'asdadas', 'asdasd',];

class Select {
  constructor(selector, options, nameIdSelect) {
    this.onClickInput = this.onClickInput.bind(this);
    this.onKeyMySelect = this.onKeyMySelect.bind(this);
    this.onFocusoutMySelect = this.onFocusoutMySelect.bind(this);
    this.onMousemoveWrapOption = this.onMousemoveWrapOption.bind(this);
    this.onKeyWrapOption = this.onKeyWrapOption.bind(this);
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.startFocusOption = this.startFocusOption.bind(this);
    this.checkedOptionByValue = this.checkedOptionByValue.bind(this);
    this.checkedOptionById = this.checkedOptionById.bind(this);
    this.checkedPrevOption = this.checkedPrevOption.bind(this);

    this.classHidden = 'hidden';
    this.classHideCompletely = 'hide-completely';
    this.classOpen = 'my-select__wrap-option--open';
    this.timeAnimation = 500;
    this.textDefault = 'Выберете пункт';

    this.options = this.createOptions(options);

    this.selectedOption;
    this.previousOption;
    this.dedicatedOption = 0;

    this.input = this.createInput(nameIdSelect);
    this.setValueInput(this.textDefault);
    this.input.addEventListener('click', this.onClickInput);

    this.wrapOptions = this.createWrapOptions();
    this.wrapOptions.append(...this.options);

    this.mySelect = this.createMySelect();
    this.mySelect.append(this.input, this.wrapOptions);
    this.mySelect.addEventListener('keydown', this.onKeyMySelect);
    this.mySelect.addEventListener('blur', this.onFocusoutMySelect, true);

    this.elem = document.querySelector(selector);
    this.elem.append(this.mySelect);
  }

  checkedOptionByValue(value) {
    const filterOptions = this.options.filter((option) => option.textContent === value);
    const id = filterOptions[0].dataset.id;

    this.checkedOptionById(id);
  }

  checkedOptionById(id) {
    this.options[id].classList.add(this.classHideCompletely);
    if (this.selectedOption && this.selectedOption !== this.previousOption) {
      this.checkedPrevOption(this.selectedOption);
    }
    this.selectedOption = this.options[id];
    this.setValueInput(this.selectedOption?.textContent);
  }

  checkedPrevOption(elem) {
    elem.classList.remove(this.classHideCompletely);
    this.previousOption = elem;
  }


  // checkFocusAccess() {
  //
  // }

  onClickInput() {
    this.close();
    this.open();
  }

  onKeyMySelect(e) {
    const key = e.key;

    if (key === ' ' || key === 'Enter') {
      this.open();
    }

    if (key === 'Escape' || key === 'Tab') {
      this.close();
    }
  }

  onFocusoutMySelect(e) {
    if (e.currentTarget.contains(e.relatedTarget)) return;
    this.close();
  }

  onMousemoveWrapOption(e) {
    const target = e.target;
    const dataOption = target.dataset.type;

    if (dataOption === 'option') {
      target.focus();
      this.dedicatedOption = +target.dataset.id;
      console.log(this.dedicatedOption);
    }
  }

  onKeyWrapOption(e) {
    const key = e.key;
    console.log(key);
    if (key === 'ArrowDown') {
      e.preventDefault();
      const prevFocusOption = this.options[(this.dedicatedOption) + 1];

      if (prevFocusOption) {
        prevFocusOption.focus();
        this.dedicatedOption = +prevFocusOption.dataset.id;
      }
    }
  }

  startFocusOption() {
    const option = [...this.wrapOptions.children].filter((option) => !option.classList.contains(this.classHideCompletely));
    option[0].focus();
    this.dedicatedOption = +option[0].dataset.id;
  }

  close() {
    if (!this.wrapOptions.classList.contains(this.classHidden)) {
      const removeHidden = () => {
        this.wrapOptions.classList.add(this.classHidden);
        this.wrapOptions.removeEventListener('mousemove', this.onMousemoveWrapOption);
        this.wrapOptions.removeEventListener('keydown', this.onKeyWrapOption);
        this.input.focus();
        clearTimeout(removeHidden);
      };

      this.wrapOptions.classList.remove(this.classOpen);
      setTimeout(removeHidden, this.timeAnimation);
    }
  }

  open() {
    if (this.wrapOptions.classList.contains(this.classHidden)) {
      this.wrapOptions.classList.add(this.classOpen);
      this.wrapOptions.classList.remove(this.classHidden);
      this.startFocusOption();

      this.wrapOptions.addEventListener('mousemove', this.onMousemoveWrapOption);
      this.wrapOptions.addEventListener('keydown', this.onKeyWrapOption);
    }
  }

  setValueInput(value) {
    this.input.textContent = value;
  }

  createWrapOptions() {
    const ul = document.createElement('ul');
    ul.classList.add('my-select__wrap-option');
    ul.classList.add(this.classHidden);
    return ul;
  }

  createOptions(options) {
    const copyOptions = [...options];
    return copyOptions.map((str, id) => {
      const li = document.createElement('li');
      li.dataset.id = id;
      li.dataset.type = 'option';
      li.textContent = str;
      li.setAttribute('tabindex', '0');
      li.classList.add('my-select__option');
      return li;
    });
  }

  createInput(nameId) {
    const p = document.createElement('p');
    p.dataset.name = nameId;
    p.id = nameId;
    p.setAttribute('tabindex', '0');
    p.classList.add('my-select__input');
    return p;
  }

  createMySelect() {
    const div = document.createElement('div');
    div.classList.add('my-select');
    return div;
  }
}

const CLASS_SELECT = '.select';

const select = new Select(CLASS_SELECT, options, 'select');
select.checkedOptionByValue('сестра');

console.log(select.elem);
console.log(select.options);
console.log(select.input);
