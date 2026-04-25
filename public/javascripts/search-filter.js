export class SearchFilter {
  constructor(contactsUl) {
    this.delay = 300;
    this.searchField = document.querySelector('.contact-name-search');
    this.contactsUl = contactsUl;
    this.init();
  }

  init() {
    const handleSearchInput = this.debounce(this.filterContactsByValue.bind(this));
    this.searchField.addEventListener('input', handleSearchInput);
  }

  filterContactsByValue() {
    const contactsListElements = Array.from(this.contactsUl.children);
    const searchValue = this.searchField.value.toLowerCase();

    contactsListElements.forEach(li => {
      const name = li.querySelector('h3').textContent.toLowerCase();
      const subStr = name.slice(0, searchValue.length);

      if (subStr !== searchValue) {
        li.classList.add('hidden');
      } else {
        li.classList.remove('hidden');
      }
    });
  }

  debounce(func) {
    let timeout;
    return (...args) => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(null, args), this.delay);
    }
  }
}