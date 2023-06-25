import CategoryForm from '../../components/CategoryForm';
import PageFormHeader from '../../components/PageFormHeader';
import useNewCategory from './useNewCategory';

export default function NewCategory() {
  const {
    categoryFormRef,
    handleSubmit,
  } = useNewCategory();

  return (
    <>
      <PageFormHeader title="Nova Categoria" backPath="/categories" />
      <CategoryForm
        ref={categoryFormRef}
        buttonLabel="Cadastrar"
        onSubmit={handleSubmit}
      />
    </>
  );
}
