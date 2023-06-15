import { useRef } from 'react';
import CategoryForm from '../../components/CategoryForm';
import PageHeader from '../../components/PageHeader';
import CategoriesService from '../../services/CategoriesService';
import toast from '../../utils/toast';

export default function NewCategory() {
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

  return (
    <>
      <PageHeader title="Nova Categoria" backPath="/categories" />
      <CategoryForm
        ref={categoryFormRef}
        buttonLabel="Cadastrar"
        onSubmit={handleSubmit}
      />
    </>
  );
}
