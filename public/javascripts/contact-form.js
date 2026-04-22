import { ContactsAPI } from "./contacts_api.js";

export class Form {
  constructor(listPageContent, list) {
    this.listPageContent = listPageContent;
    this.contactList = list;
    this.main = document.querySelector('main');
  }

  renderForm() {
    // renders form layout
    const contactFormHtml = this.createHeaderHTML() + this.createNewContactFormHTML();
    this.main.innerHTML = contactFormHtml;

    // adds event to cancelbtn; renders previous state
    const cancelBtn = document.querySelector('#cancel-btn');
    cancelBtn.addEventListener('click', e => this.handleCancel(e));

    // creates Contact; renders new state
    const form = document.querySelector('form'); 
    form.addEventListener('submit', e => this.handleSubmit(e));
  }

  handleCancel(e) {
    this.main.replaceChildren(...this.listPageContent);
  } 

  async handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;

    const isCreated = await ContactsAPI.createContact(form);
    if (!isCreated) {
      // do something
    }
    // render contact list page (previous state)
    this.main.replaceChildren(...this.listPageContent);
    // render new state
    this.contactList.renderList();
  }

  createHeaderHTML() {
    return `
      <header>
        <h2>Create Contact</h2>
      </header>
    `;
  }

  createNewContactFormHTML() {
    return `
      <form role="form">
        <label>Full name:</label>
        <input type="text" name="full_name" value>

        <label>Email address:</label>
        <input type="email" name="email" value>

        <label>Telephone number:</label>
        <input type="tel" name="phone_number" value>

        <label>Tags</label>
        <input type="text" name="tags" value>

        <button id="submit-btn" type="submit">Submit</button>
      </form>
      <button id="cancel-btn" type="button">Cancel</button>
    `;
  }
}