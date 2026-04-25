export class Contact {
  constructor({ full_name, email, phone_number, tags, id }) {
    this.full_name = full_name;
    this.email = email;
    this.tel = phone_number;
    this.tags = tags;
    this.id = id;
  }

  createListElement() {
    const li = document.createElement('li');
    li.id = this.id;

    const contactHeading = this.constructContactHeading();
    const contactBody = this.constructContactBody();
    const contactButtons = this.constructContactButtons();
    
    li.replaceChildren(contactHeading, contactBody, contactButtons);

    return li;
  }

  constructContactHeading() {
    const contactHeading = document.createElement('div');
    contactHeading.classList.add('contact-heading');
    
    const heading = document.createElement('h3');
    heading.textContent = this.full_name;

    contactHeading.append(heading);

    return contactHeading;
  }

  constructContactBody() {
    const contactBody = document.createElement('div');
    contactBody.classList.add('contact-body');

    const dl = document.createElement('dl');

    const dtPhoneNum = document.createElement('dt');
    dtPhoneNum.textContent = 'Phone Number:';
    const ddPhoneNum = document.createElement('dd');
    ddPhoneNum.textContent = this.tel;

    const dtEmail = document.createElement('dt');
    dtEmail.textContent = 'Email:';
    const ddEmail = document.createElement('dd');
    ddEmail.textContent = this.email;

    const dtTags = document.createElement('dt');
    dtTags.textContent = 'Tags:';

    const ddTags = document.createElement('dd');
    ddTags.classList.add('tags');
    // this.tags === null when no tags are provided
    if (this.tags) {
      ddTags.innerHTML = this.tags.split(",").map(tag => `<a href="#" class="tag">${tag}</a>`).join(", ");
    }
    
    dl.replaceChildren(dtPhoneNum, ddPhoneNum, dtEmail, ddEmail, dtTags, ddTags);
    contactBody.append(dl);

    return contactBody;
  }

  constructContactButtons() {
    const btnWrapper = document.createElement('div');
    btnWrapper.classList.add('contact-btn-wrapper');

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.classList.add('edit-btn');

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');

    btnWrapper.replaceChildren(editBtn, deleteBtn);

    return btnWrapper;
  }
}