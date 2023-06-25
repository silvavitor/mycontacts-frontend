import PageFormHeader from '../../components/PageFormHeader';
import CategoryForm from '../../components/CategoryForm';
import Loader from '../../components/Loader';
import useEditCategory from './useEditCategory';

export default function EditCategory() {
  const {
    isLoading,
    categoryName,
    categoryFormRef,
    handleSubmit,
  } = useEditCategory();

  return (
    <>
      <Loader isLoading={isLoading} />
      <PageFormHeader
        title={isLoading ? 'Carregando...' : `Editar ${categoryName}`}
        backPath="/categories"
      />

      <CategoryForm
        ref={categoryFormRef}
        buttonLabel="Salvar alterações"
        onSubmit={handleSubmit}
      />
    </>
  );
}
