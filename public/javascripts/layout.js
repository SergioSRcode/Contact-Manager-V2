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

  static createFormHTML() {
   return `
<form role="form">
  <label>Full name:</label>
  <input type="text" name="full_name" required>

  <label>Email address:</label>
  <input type="email" name="email">

  <label>Telephone number:</label>
  <input type="tel" name="phone_number">

  <label>Tags</label>
  <input type="text" name="tags">

  <button id="submit-btn" type="submit">Submit</button>
</form>
<button id="cancel-btn" type="button">Cancel</button>
`;
  }
}