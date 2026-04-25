import { ContactsList } from "./contacts_list.js";
import { Layout } from "./layout.js";

document.addEventListener('DOMContentLoaded', initContactManager);

async function initContactManager(e) {
  const mainContent = Array.from(document.querySelector('main').children);
  const list = new ContactsList(mainContent);
  await list.renderList();
  await handleClickOnTitle(list);
}

function handleClickOnTitle(list) {
  const title = document.body.querySelector('header > div > a');
  const main = document.body.querySelector('main');
  
  title.addEventListener('click', async e => {
    e.preventDefault();

    main.innerHTML = Layout.createlistLayoutHTML();
    await list.renderList();
  });
}