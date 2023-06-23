import { useRef } from 'react';
import CategoriesService from '../../services/CategoriesService';
import toast from '../../utils/toast';

export default function useNewCategory() {
  const categoryFormRef = useRef(null);

  async function handleSubmit(category) {
    try {
      await CategoriesService.createCategory(category);

      categoryFormRef.current.resetFields();

      toast({
        type: 'success',
        text: 'Categoria criada com sucesso!',
      });
    } catch (error) {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao cadastrar a categoria',
      });
    }
  }

  return {
    categoryFormRef,
    handleSubmit,
  };
}
