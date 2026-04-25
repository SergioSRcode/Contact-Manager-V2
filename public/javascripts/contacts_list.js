import { ContactsAPI } from "./contacts_api.js";
import { Contact } from "./contact.js";
import { Form } from "./contact-form.js";
import { SearchFilter } from "./search-filter.js";
import { showNotification } from "./notification.js";

export class ContactsList {
  constructor(mainContent) {
    this.contactsUl;
    this.jsonList;
    this.mainContent = mainContent;
  }

  async renderList() {
    const contactsWrapper = document.querySelector('#contacts-container');
    contactsWrapper.innerHTML = '';

    this.contactsUl = document.createElement('ul');
    this.contactsUl.id = 'contacts'
    contactsWrapper.append(this.contactsUl);

    this.jsonList = await ContactsAPI.getAll();
    const listElements = Array.from(this.jsonList).map(contactInfo => new Contact(contactInfo).createListElement());
    // fill ul with fetched contacts
    this.contactsUl.replaceChildren(...listElements);

    this.enableEmptyContactsPlaceholder();
    this.enableContactButtons();
    this.enableFilterByTag();
    this.enableSearchFilter();
    this.initRouteToForm();
  }

  enableEmptyContactsPlaceholder() {
    const placeholder = document.querySelector('#empty-contacts-placeholder');
    if (this.jsonList.length !== 0) placeholder.classList.add('hidden');
  }

  enableContactButtons() {
    this.contactsUl.addEventListener('click', async e => {
      const btn = e.target;

      if (btn.classList.contains('edit-btn')) {
        await this.handleEdit(btn);
      } else if (btn.classList.contains('delete-btn')) {
        await this.handleDelete(btn);
      }
    });
  }

  async handleEdit(btn) {
    const currentContact = btn.closest('li');
    const contactObj = await ContactsAPI.getById(currentContact.id);
    
    new Form(this.mainContent, this).renderForm(contactObj);
  }

  async handleDelete(btn) {
    const currentContact = btn.closest('li');
    const currentContactName = currentContact.querySelector('h3').textContent;

    if (confirm(`Do you want to delete "${currentContactName}" ?`)) {
      const isDeleted = await ContactsAPI.deleteById(currentContact.id);

      if (!isDeleted) {
        showNotification('Oops, something went wrong. Deleting contact failed.');
        return;
      }

      this.renderList();
      showNotification(`Contact "${currentContactName}" was deleted.`, 'success');
    }    
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
      }
    });
  }

  initRouteToForm() {
    const linksToForm = document.querySelectorAll('.newContactForm');
    linksToForm.forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        new Form(this.mainContent, this).renderForm();
      });
    });
  }

  enableSearchFilter() {
    new SearchFilter(this.contactsUl);
  }
}