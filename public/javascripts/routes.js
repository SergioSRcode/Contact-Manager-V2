import { Form } from "./contact-form.js";

export const routes = {
  initRouteToForm(list) {
    const linksToForm = document.querySelectorAll('.newContactForm');
    linksToForm.forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        new Form(list).renderForm();
        console.log('hurray');
      });
    });
  }
};

