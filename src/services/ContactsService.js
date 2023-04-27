class ContactsService {
  async listContacts(orderBy = 'asc') {
    const response = await fetch(`http://localhost:3132/contacts?orderBy=${orderBy}`);
    return response.json();
  }
}

export default new ContactsService();
