// import { ContactsAPI } from "./contacts_api.js";
import { testingAPIData } from "./contacts_api_seed_data.js";
import { ContactsList } from "./contacts_list.js";

document.addEventListener('DOMContentLoaded', async () => {
  // testingAPIData();
  const list = new ContactsList();
  await list.renderList();
  // console.log(list.jsonList);

});


