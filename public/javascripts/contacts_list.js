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
    // const listElements = Array.from(this.jsonList).map(contact => this.createListElement(contact));
    const listElements = Array.from(this.jsonList).map(contactInfo => new Contact(contactInfo).createListElement());

    ul.replaceChildren(...listElements);
    this.htmlList = ul;
    this.hideEmptyContactsPlaceholder();
  }

  hideEmptyContactsPlaceholder() {
    const placeholder = document.querySelector('#empty-contacts-placeholder');
    if (this.jsonList.length !== 0) placeholder.classList.add('hidden');
  }

  // createListElement(contact) {
  //   const li = document.createElement('li');
  //   li.id = contact.id;

  //   const contactHeading = this.constructContactHeading(contact);
  //   const contactBody = this.constructContactBody(contact);
  //   // create buttons

  //   li.replaceChildren(contactHeading, contactBody);

  //   return li;
  // }

  // constructContactHeading(contact) {
  //   const contactHeading = document.createElement('div');
  //   contactHeading.classList.add('contact-heading');
    
  //   const heading = document.createElement('h3');
  //   heading.textContent = contact["full_name"];

  //   contactHeading.append(heading);

  //   return contactHeading;
  // }

  // constructContactBody(contact) {
  //   const contactBody = document.createElement('div');
  //   contactBody.classList.add('contact-body');

  //   const dl = document.createElement('dl');

  //   const dtPhoneNum = document.createElement('dt');
  //   dtPhoneNum.textContent = 'Phone Number:';
  //   const ddPhoneNum = document.createElement('dd');
  //   ddPhoneNum.textContent = contact["phone_number"];

  //   const dtEmail = document.createElement('dt');
  //   dtEmail.textContent = 'Email:';
  //   const ddEmail = document.createElement('dd');
  //   ddEmail.textContent = contact.email;

  //   const dtTags = document.createElement('dt');
  //   dtTags.textContent = 'Tags:';
  //   const ddTags = document.createElement('dd');
  //   // if no tags are present, value is null. This turns null to an empty string instead.
  //   const parsedTags = contact.tags ? contact.tags : "";
  //   ddTags.innerHTML = parsedTags.split(",").map(tag => `<a href="#">${tag}</a>`).join(", ") || "";

  //   dl.replaceChildren(dtPhoneNum, ddPhoneNum, dtEmail, ddEmail, dtTags, ddTags);
  //   contactBody.append(dl);

  //   return contactBody;
  // }

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