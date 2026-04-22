import { ContactsAPI } from "./contacts_api.js";
import { Contact } from "./contact.js";

export class ContactsList {
  constructor() {
    this.contactsUl;
    this.jsonList;
    this.htmlList;
  }

  async renderList() {
    const contactsWrapper = document.querySelector('#contacts-container');
    this.contactsUl = document.createElement('ul');
    this.contactsUl.id = 'contacts'
    contactsWrapper.append(this.contactsUl);

    this.jsonList = await ContactsAPI.getAll();
    const listElements = Array.from(this.jsonList).map(contactInfo => new Contact(contactInfo).createListElement());

    this.contactsUl.replaceChildren(...listElements);
    this.htmlList = this.contactsUl;
    this.hideEmptyContactsPlaceholder();
    // attach event listener to this.contactsUl (each list element button and tag)
    this.enableFilterByTag();
  }

  hideEmptyContactsPlaceholder() {
    const placeholder = document.querySelector('#empty-contacts-placeholder');
    if (this.jsonList.length !== 0) placeholder.classList.add('hidden');
  }

  searchList() {
    // searches list by input value (according to name)
  }

  enableFilterByTag() {
    this.contactsUl.addEventListener('click', e => {
      if (e.target.classList.contains('tag')) {
        const allTags = this.contactsUl.querySelectorAll('.tags');

        // removes all highlights other than the curr tag
        allTags.forEach(tagList => {
          const tags = tagList.querySelectorAll('.tag');
          tags.forEach(tag => {
            if (tag !== e.target) tag.classList.remove('highlight')
          });
        });

        // de/activates filter
        e.target.classList.toggle('highlight');

        allTags.forEach(taglist => {
          if (!e.target.classList.contains('highlight')) {
            // removes filter
            taglist.closest('li').classList.remove('hidden');
          } else {
            // sets filter
            const textTags = Array.from(taglist.children).map(tag => tag.textContent);
            if (!textTags.includes(e.target.textContent)) {
              taglist.closest('li').classList.add('hidden');
            }
          }
        });
      };
    });
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