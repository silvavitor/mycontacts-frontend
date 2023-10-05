import ContactMapper from './mappers/ContactMapper';
import HttpClient from './utils/HttpClient';

class ContactsService {
  constructor() {
    this.apiClient = new HttpClient('http://localhost:3132');
  }

  async listContacts(orderBy, signal) {
    const contacts = await this.apiClient.get(`/contacts?orderBy=${orderBy || 'asc'}`, { signal });

    return contacts.map(ContactMapper.toDomain);
  }

  async getContactById(id, signal) {
    const contact = await this.apiClient.get(`/contacts/${id}`, { signal });

    return ContactMapper.toDomain(contact);
  }

  createContact(contact) {
    const body = ContactMapper.toPersistence(contact);

    return this.apiClient.post('/contacts', { body });
  }

  updateContact(id, contact) {
    const body = ContactMapper.toPersistence(contact);

    return this.apiClient.put(`/contacts/${id}`, { body });
  }

  deleteContact(id) {
    return this.apiClient.delete(`/contacts/${id}`);
  }
}

export default new ContactsService();
