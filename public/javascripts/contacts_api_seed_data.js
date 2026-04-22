import { ContactsAPI } from "./contacts_api.js";

function createForm() {
  const form = document.createElement('form');
  const nameInput = document.createElement('input');
  nameInput.type = 'text';
  nameInput.name = 'full_name';
  nameInput.value = 'Tester Testo2';

  const emailInput = document.createElement('input');
  emailInput.type = 'email';
  emailInput.name = 'email';
  emailInput.value = 'tester@testo.org';

  const telInput = document.createElement('input');
  telInput.type = 'tel';
  telInput.name = 'phone_number';
  telInput.value = '1234566';
  form.replaceChildren(nameInput, emailInput, telInput);

  return form;
}


export async function testingAPIData() {
  const form = createForm();
  const json = await ContactsAPI.getAll();
  // const json = await ContactsAPI.getById(1);
  // await ContactsAPI.createContact(form);
  // await ContactsAPI.updateContactbyId(4, form);
  // await ContactsAPI.deleteById(4);
  console.log(json);
}