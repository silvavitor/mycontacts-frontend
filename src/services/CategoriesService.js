import CategoryMapper from './mappers/CategoryMapper';
import HttpClient from './utils/HttpClient';

class ContegoriesService {
  constructor() {
    this.apiClient = new HttpClient('http://localhost:3132');
  }

  createCategory(category) {
    const body = CategoryMapper.toPersistence(category);

    return this.apiClient.post('/categories', { body });
  }

  async listCategories(orderBy = 'asc') {
    const categories = await this.apiClient.get(`/categories?orderBy=${orderBy}`);

    return categories.map(CategoryMapper.toDomain);
  }

  async getCategoryById(id) {
    const contact = await this.apiClient.get(`/categories/${id}`);

    return CategoryMapper.toDomain(contact);
  }

  updateCategory(id, category) {
    const body = CategoryMapper.toPersistence(category);

    return this.apiClient.put(`/categories/${id}`, { body });
  }

  deleteCategory(id) {
    return this.apiClient.delete(`/categories/${id}`);
  }
}

export default new ContegoriesService();
