import HttpClient from './utils/HttpClient';

class ContegoriesService {
  constructor() {
    this.apiClient = new HttpClient('http://localhost:3132');
  }

  listCategories() {
    return this.apiClient.get('/categories');
  }
}

export default new ContegoriesService();
