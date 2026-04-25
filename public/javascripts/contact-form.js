import { ContactsAPI } from "./contacts_api.js";
import { showNotification } from "./notification.js";
import { Layout } from "./layout.js";

export class Form {
  constructor(listPageContent, list) {
    this.listPageContent = listPageContent;
    this.contactList = list;
    this.main = document.querySelector('main');
  }

  renderForm(contactObj = {}) {
    // renders form layout
    const contactFormHtml = this.createHeaderHTML() + this.createNewContactFormHTML(contactObj);
  
    this.main.innerHTML = contactFormHtml;

    // adds event to cancelbtn; renders previous state
    const cancelBtn = document.querySelector('#cancel-btn');
    cancelBtn.addEventListener('click', e => this.renderPreviousListState(e));

    // creates Contact; renders new state
    const form = document.querySelector('form'); 
    form.addEventListener('submit', e => this.handleSubmit(e, contactObj.id));
  }

  renderPreviousListState(e) {
    this.main.replaceChildren(...this.listPageContent);
  } 

  async handleSubmit(e, contactId) {
    e.preventDefault();
    const form = e.currentTarget;
    
    if (contactId) {
      const isUpdated = await ContactsAPI.updateContactbyId(contactId, form);
      if (!isUpdated) {
        showNotification('Oops, something went wrong. Unable to update contact info.');
        return;
      }
    } else {
      const isCreated = await ContactsAPI.createContact(form);
      if (!isCreated) {
        showNotification('Oops, something went wrong. Unable to create new contact.');
        return;
      }
    }
    // render contact list page layout then render new state
    document.querySelector('main').innerHTML = Layout.createlistLayoutHTML();
    this.contactList.renderList();

    contactId ? 
      showNotification('Contact successfully updated!', 'success') : 
      showNotification('New Contact created!', 'success');
  }

  createHeaderHTML() {
    return `
      <header>
        <h2>Create Contact</h2>
      </header>
    `;
  }

  createNewContactFormHTML(contact) {
    return `
      <form role="form">
        <label>Full name:</label>
        <input type="text" name="full_name" value="${contact.full_name || ''}" required>

        <label>Email address:</label>
        <input type="email" name="email" value="${contact.email || ''}">

        <label>Telephone number:</label>
        <input type="tel" name="phone_number" value="${contact.phone_number || ''}">

        <label>Tags</label>
        <input type="text" name="tags" value="${contact.tags || ''}">

        <button id="submit-btn" type="submit">Submit</button>
      </form>
      <button id="cancel-btn" type="button">Cancel</button>
    `;
  }
}