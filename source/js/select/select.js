const options = ['мама', 'папа', 'сестра', 'жена'];

class Select {
  constructor(selector, options, nameIdSelect) {
    this.options = this.createOptions(options);

    this.selectedOption = this.options[0];
    this.previousOption = this.options[0];

    this.input = this.createInput(nameIdSelect);
    this.setValueInput(this.selectedOption.textContent);
    this.input.addEventListener('click', this.onClickSelect);

    this.wrapOptions = this.createWrapOptions();
    this.wrapOptions.append(...this.options);

    this.mySelect = this.createMySelect();
    this.mySelect.append(this.input, this.wrapOptions);

    this.elem = document.querySelector(selector);
    this.elem.append(this.mySelect);
  }

  onClickSelect() {
    // console.log(this);
  }

  setValueInput(value) {
    this.input.textContent = value;
  }

  createWrapOptions() {
    const ul = document.createElement('ul');
    ul.classList.add('mySelect__wrap-option');
    return ul;
  }

  createOptions(options) {
    const copyOptions = [...options];
    return copyOptions.map((str, id) => {
      const li = document.createElement('li');
      li.dataset.id = id;
      li.textContent = str;
      li.setAttribute('tabindex', '0');
      li.classList.add('mySelect__option');
      return li;
    });
  }

  createInput(nameId) {
    const p = document.createElement('p');
    p.dataset.name = nameId;
    p.id = nameId;
    p.setAttribute('tabindex', '0');
    p.classList.add('mySelect__input');
    return p;
  }

  createMySelect() {
    const div = document.createElement('div');
    div.classList.add('mySelect');
    return div;
  }
}

const CLASS_SELECT = '.select';

const select = new Select(CLASS_SELECT, options, 'select');
// select.select.classList.add();

console.log(select.elem);
console.log(select.options);
console.log(select.input);
