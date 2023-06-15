import CategoryMapper from './mappers/CategoryMapper';
import HttpClient from './utils/HttpClient';

class ContegoriesService {
  constructor() {
    this.apiClient = new HttpClient('http://localhost:3132');
  }

  async listCategories() {
    const categories = await this.apiClient.get('/categories');
    return categories.map(CategoryMapper.toDomain);
  }
}

export default new ContegoriesService();
