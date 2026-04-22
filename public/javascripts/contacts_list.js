import { ContactsAPI } from "./contacts_api.js";
import { Contact } from "./contact.js";

export class ContactsList {
  constructor() {
    this.jsonList;
    this.htmlList;
  }

  async renderList() {
    const ul = document.querySelector('#contacts');

    this.jsonList = await ContactsAPI.getAll();
    const listElements = Array.from(this.jsonList).map(contactInfo => new Contact(contactInfo).createListElement());

    ul.replaceChildren(...listElements);
    this.htmlList = ul;
    this.hideEmptyContactsPlaceholder();
    // attach event listener to ul (each list element button)
  }

  hideEmptyContactsPlaceholder() {
    const placeholder = document.querySelector('#empty-contacts-placeholder');
    if (this.jsonList.length !== 0) placeholder.classList.add('hidden');
  }

  searchList() {
    // searches list by input value (according to name)
  }

  filterByTag(tag) {
    // hides all elements without the tag
  }

  createNewContact() {
    // instantiate contact obj from Contact class
  }

  getJSONList() { // read only?
    // return copy of this.jsonList
  }

  getHTMLList() { // read only?
    // return copy of this.htmlList
  }
}