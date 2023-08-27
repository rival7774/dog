const options = ['мама', 'папа', 'сестра', 'жена', 'osuefosifjm', 'sedgsjirhgiuagh airghj oiajrg ajoi gja', 'shsfasf', 'hddjsdgs', 'gdhsg', 'asdasgaf', 'asdadas', 'asdasd',];

class Select {
  constructor(selector, options, nameIdSelect) {
    this.onClickInput = this.onClickInput.bind(this);
    this.onKeyMySelect = this.onKeyMySelect.bind(this);
    this.onFocusoutMySelect = this.onFocusoutMySelect.bind(this);
    this.onMousemoveWrapOption = this.onMousemoveWrapOption.bind(this);
    this.onKeyWrapOption = this.onKeyWrapOption.bind(this);
    this.onClickWrapOption = this.onClickWrapOption.bind(this);
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.startFocusOption = this.startFocusOption.bind(this);
    this.checkedOptionByValue = this.checkedOptionByValue.bind(this);
    this.checkedOptionById = this.checkedOptionById.bind(this);

    this.elem = document.querySelector(selector);
    this.select = document.querySelector(selector);

    this.classHidden = 'hidden';
    this.classOpen = 'my-select__wrap-option--open';
    this.timeAnimation = 500;
    this.textDefault = 'Выберете пункт';
    this.dedicatedOption = 0;

    this.options = this.createOptions(options);

    this.input = this.createInput(nameIdSelect);
    this.setValueInput(this.textDefault);
    this.input.addEventListener('click', this.onClickInput);

    this.wrapOptions = this.createWrapOptions();
    this.wrapOptions.append(...this.options);

    this.mySelect = this.createMySelect();
    this.mySelect.append(this.input, this.wrapOptions);
    this.mySelect.addEventListener('keydown', this.onKeyMySelect);
    this.mySelect.addEventListener('blur', this.onFocusoutMySelect, true);

    this.elem.append(this.mySelect);
  }

  checkedOptionByValue(value) {
    const filterOptions = this.options.filter((option) => option.textContent === value);
    const id = +filterOptions[0].dataset.id;

    this.checkedOptionById(id);
  }

  checkedOptionById(id) {
    const wrap = new DocumentFragment();
    wrap.append(...this.options);
    const copyOptions = wrap.cloneNode(true).children;

    copyOptions[id].remove();
    this.wrapOptions.innerHTML = '';
    this.wrapOptions.append(...copyOptions);
    this.setValueInput(this.options[id]?.textContent);

    // const sel = document.querySelector('#selnam').value = '1';
    // console.log(sel);
  }

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
    if (!this.wrapOptions.classList.contains(this.classHidden)) {
      const removeHidden = () => {
        this.wrapOptions.classList.add(this.classHidden);
        this.wrapOptions.removeEventListener('mousemove', this.onMousemoveWrapOption);
        this.wrapOptions.removeEventListener('keydown', this.onKeyWrapOption);
        this.wrapOptions.removeEventListener('click', this.onClickWrapOption);
        this.input.focus();

        if (option !== undefined) {
          this.checkedOptionById(+option.dataset.id);
        }

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
      this.wrapOptions.addEventListener('click', this.onClickWrapOption);
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
select.checkedOptionByValue('мама');

