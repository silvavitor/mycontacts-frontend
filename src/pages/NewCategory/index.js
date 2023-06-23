import CategoryForm from '../../components/CategoryForm';
import PageHeader from '../../components/PageHeader';
import useNewCategory from './useNewCategory';

export default function NewCategory() {
  const {
    categoryFormRef,
    handleSubmit,
  } = useNewCategory();

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
