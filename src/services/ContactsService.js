import HttpClient from './utils/HttpClient';

class ContactsService {
  constructor() {
    this.apiClient = new HttpClient('http://localhost:3132');
  }

  async listContacts(orderBy = 'asc') {
    return this.apiClient.get(`/contacts?orderBy=${orderBy}`);
  }

  async createContact(contact) {
    return this.apiClient.post('/contacts', { body: contact });
  }
}

export default new ContactsService();
