import HttpClient from './utils/HttpClient';

class ContactsService {
  constructor() {
    this.apiClient = new HttpClient('http://localhost:3132');
  }

  listContacts(orderBy = 'asc') {
    return this.apiClient.get(`/contacts?orderBy=${orderBy}`);
  }

  getContactById(id) {
    return this.apiClient.get(`/contacts/${id}`);
  }

  createContact(contact) {
    return this.apiClient.post('/contacts', { body: contact });
  }

  updateContact(id, contact) {
    return this.apiClient.put(`/contacts/${id}`, { body: contact });
  }
}

export default new ContactsService();
