const options = ['мама', 'папа', 'сестра', 'жена', 'osuefosifjm', 'sedgsjirhgiuagh airghj oiajrg ajoi gja', 'shsfasf', 'hddjsdgs', 'gdhsg', 'asdasgaf', 'asdadas', 'asdasd',];

class Select {
  constructor(selector, selectorSelect) {
    this.onClickWrapInput = this.onClickWrapInput.bind(this);
    this.onKeyMySelect = this.onKeyMySelect.bind(this);
    this.onFocusoutMySelect = this.onFocusoutMySelect.bind(this);
    this.onMousemoveWrapOption = this.onMousemoveWrapOption.bind(this);
    this.onKeyWrapOption = this.onKeyWrapOption.bind(this);
    this.onClickWrapOption = this.onClickWrapOption.bind(this);

    this.classHidden = 'hidden';
    this.classVisuallyHidden = 'visually-hidden';
    this.classOpen = 'my-select__wrap-option--open';
    this.classOpenArrow = 'my-select__arrow--open';
    this.dedicatedOption = 0;
    this.selectOpen = false;

    this.elem = document.querySelector(selector);
    this.select = this.elem.querySelector(selectorSelect);

    this.select.tabIndex = '-1';
    this.select.classList.add(this.classVisuallyHidden);

    this.options = this.createOptions([...this.select.children]);
    this.input = this.createInput(this.select.name);
    this.arrow = this.createArrow();
    this.wrapInput = this.createWrapInput();
    this.wrapOptions = this.createWrapOptions();
    this.mySelect = this.createMySelect();

    this.wrapInput.addEventListener('click', this.onClickWrapInput);

    this.wrapOptions.append(...this.options);
    this.wrapInput.append(this.input, this.arrow);

    this.mySelect.append(this.wrapInput, this.wrapOptions);
    this.mySelect.addEventListener('keydown', this.onKeyMySelect);
    this.mySelect.addEventListener('blur', this.onFocusoutMySelect, true);

    this.elem.append(this.mySelect);
    this.checkedOptionById(this.select.selectedIndex);
  }

  checkedOptionByValue(value) {
    const filterOption = this.options.find((option) => option.textContent === value);
    const id = +filterOption.dataset.id;

    this.checkedOptionById(id);
  }

  checkedOptionById(id) {
    const wrap = new DocumentFragment();
    wrap.append(...this.options);
    const copyOptions = wrap.cloneNode(true).children;

    copyOptions[id].remove();
    this.wrapOptions.innerHTML = '';
    this.wrapOptions.append(...copyOptions);
    this.setValueInput(id);
  }

  onClickWrapInput() {
    if (this.selectOpen) {
      this.close();
      return;
    }

    this.open();
  }

  onKeyMySelect(e) {
    const key = e.key;
    const target = e.target;

    if ((key === ' ' || key === 'Enter') && this.input.contains(target)) {
      this.open();
    }

    if ((key === 'Escape' || key === 'Tab') && this.mySelect.contains(target)) {
      this.close();
    }
  }

  onFocusoutMySelect(e) {
    if (e.currentTarget.contains(e.relatedTarget)) return;
    this.close();
  }

  onMousemoveWrapOption(e) {
    const target = e.target;
    const dataTypeOption = target.dataset.type;

    if (dataTypeOption === 'option') {
      target.focus();
      this.dedicatedOption = [...this.wrapOptions.children].findIndex((elem) => elem.textContent === target.textContent);
    }
  }

  onClickWrapOption(e) {
    const target = e.target;
    const dataTypeOption = target.dataset.type;

    if (dataTypeOption === 'option') {
      this.close(target);
    }
  }

  onKeyWrapOption(e) {
    const key = e.key;
    let prevFocusOption;

    if (key === 'ArrowDown') {
      prevFocusOption = this.wrapOptions.children[this.dedicatedOption + 1];
      this.dedicatedOption = prevFocusOption ? this.dedicatedOption + 1 : this.dedicatedOption;
    }

    if (key === 'ArrowUp') {
      prevFocusOption = this.wrapOptions.children[this.dedicatedOption - 1];
      this.dedicatedOption = prevFocusOption ? this.dedicatedOption - 1 : this.dedicatedOption;
    }

    if (prevFocusOption) {
      e.preventDefault();
      prevFocusOption.focus();
      return;
    }

    if (key === ' ' || key === 'Enter') {
      e.preventDefault();
      this.close(e.target);
    }
  }

  startFocusOption() {
    let option;
    if (this.dedicatedOption !== undefined) {
      option = this.wrapOptions.children[this.dedicatedOption];
    } else {
      option = this.wrapOptions.children[0];
      this.dedicatedOption = 0;
    }

    this.wrapOptions.scrollTop = option.offsetTop;
    option.focus();
  }

  close(option) {
    if (this.selectOpen) {
      this.arrow.classList.remove(this.classOpenArrow);
      this.wrapOptions.classList.add(this.classHidden);
      this.wrapOptions.removeEventListener('mousemove', this.onMousemoveWrapOption);
      this.wrapOptions.removeEventListener('keydown', this.onKeyWrapOption);
      this.wrapOptions.removeEventListener('click', this.onClickWrapOption);
      this.input.focus();

      if (option !== undefined && option !== null) {
        this.checkedOptionById(+option.dataset.id);
      }

      this.wrapOptions.classList.remove(this.classOpen);
      this.selectOpen = false;
    }
  }

  open() {
    if (!this.selectOpen) {
      this.arrow.classList.add(this.classOpenArrow);
      this.wrapOptions.classList.add(this.classOpen);
      this.wrapOptions.classList.remove(this.classHidden);
      this.startFocusOption();

      this.wrapOptions.addEventListener('mousemove', this.onMousemoveWrapOption);
      this.wrapOptions.addEventListener('keydown', this.onKeyWrapOption);
      this.wrapOptions.addEventListener('click', this.onClickWrapOption);

      this.selectOpen = true;
    }
  }

  setValueInput(idOption) {
    const option = this.options[idOption];
    this.input.textContent = option.textContent;
    this.select.selectedIndex = idOption;
  }

  createArrow() {
    const span = document.createElement('span');
    span.classList.add('my-select__arrow');
    span.setAttribute('tabindex', '-1');
    return span;
  }

  createWrapOptions() {
    const ul = document.createElement('ul');
    ul.classList.add('my-select__wrap-option');
    ul.classList.add(this.classHidden);
    return ul;
  }

  createOptions(options) {
    return options.map((option, id) => {
      const li = document.createElement('li');
      li.dataset.id = id;
      li.dataset.type = 'option';
      li.textContent = option.textContent;
      li.setAttribute('tabindex', '0');
      li.classList.add('my-select__option');
      return li;
    });
  }

  createWrapInput() {
    return document.createElement('div');
  }

  createInput(nameId) {
    const p = document.createElement('p');
    p.dataset.name = nameId;
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

const CLASS_SELECT = '.select-grooming';

const select = new Select(CLASS_SELECT, '.select');
select.input.classList.add('input');
