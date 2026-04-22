export class ContactsAPI {
  static async getAll() {
    try {
      const response = await fetch('/api/contacts');
      if (!response.ok) throw new Error("Unable to fetch contacts");

      return await response.json();
    } catch (error) {
      console.error(error);
    }
  }

  static async getById(id) {
    try {
      const response = await fetch(`/api/contacts/${id}`);
      if (!response.ok) throw new Error("Unable to fetch contact");

      return await response.json();
    } catch (error) {
      console.error(error);
    }
  }
  
  static async createContact(form) {
    try {
      const json = JSON.stringify(ContactsAPI.formDataToJson(new FormData(form)));

      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: json,
      });

      if (!response.ok) throw new Error("Unable to create contact");

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  static async updateContactbyId(id, form) {
    try {
      const json = JSON.stringify(ContactsAPI.formDataToJson(new FormData(form)));

      const response = await fetch(`/api/contacts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: json,
      });

      if (!response.ok) throw new Error("Unable to update contact");

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  static async deleteById(id) {
    try {
      const response = await fetch(`/api/contacts/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error("Unable to delete contact");

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  // helper
  static formDataToJson(formData) {
    return Object.fromEntries(formData.entries());
  }
}
