export class Layout {
  static createlistLayoutHTML() {
    return `
<main>
  <div id="topbar">
    <a href="#contacts/new" class="btn newContactForm">Add Contact</a>
    <input type="text" class="contact-name-search" placeholder="Search">
  </div>
  <div id="contacts-container">
    <!-- <ul id="contacts"></ul> -->
  </div>
  <div id="empty-contacts-placeholder">
    <!-- Hidden if contacts are available -->
    <h3>There are no contacts</h3>
    <a href="#contacts/new" class="btn newContactForm">Add Contact</a>
  </div>
  <div id="empty-search-contacts-placeholder">
    <!-- dynamically generated content -->
  </div>
</main>`;
  }
}