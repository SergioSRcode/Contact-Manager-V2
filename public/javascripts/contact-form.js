export class Form {
  constructor(mainContent, list) {
    this.mainContent = mainContent;
    this.contactList = list;
  }

  renderForm() {
    // renders form layout
    const main = document.querySelector('main');
    const contactFormHtml = this.createHeaderHTML() + this.createNewContactFormHTML();
    main.innerHTML = contactFormHtml;

    // adds event to cancelbtn; renders previous state
    const cancelBtn = document.querySelector('#cancel-btn');
    cancelBtn.addEventListener('click', e => {
      main.replaceChildren(...this.mainContent);
    });

    const submitButton = document.querySelector('#submit-btn'); // get form
    submitButton.addEventListener('click', e => { // turn click to submit
      e.preventDefault();

      main.replaceChildren(...this.mainContent);
      this.contactList.renderList();
    });
  }

  async handleSubmit() {
    const main = document.querySelector('main');
    const submitButton = document.querySelector('#submit-btn');
    submitButton.addEventListener('submit', e => {
      e.preventDefault();
      console.log('clicked')
      main.replaceChildren(...this.mainContent);
      this.contactList.renderList();
    })
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