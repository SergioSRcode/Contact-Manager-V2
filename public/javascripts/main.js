// import { ContactsAPI } from "./contacts_api.js";
import { testingAPIData } from "./contacts_api_seed_data.js";
import { ContactsList } from "./contacts_list.js";

document.addEventListener('DOMContentLoaded', async () => {
  const mainContent = Array.from(document.querySelector('main').children);
  // testingAPIData();
  const list = new ContactsList(mainContent);
  await list.renderList();
});


