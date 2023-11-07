/* eslint-disable react/jsx-one-expression-per-line */
import { Container } from './styles';

import Loader from '../../components/Loader';
import Modal from '../../components/Modal';

import useCategories from './useCategories';
import InputSearch from '../../components/InputSearch';
import PageHeader from '../../components/PageHeader';
import ErrorStatus from '../../components/ErrorStatus';
import SearchNotFound from '../../components/SearchNotFound';
import EmptyList from '../../components/EmptyList';
import CategoriesList from './components/CategoriesList';

export default function Categories() {
  const {
    isLoading,
    isDeleteModalVisible,
    categoryBeingDeleted,
    handleConfirmDeleteCategory,
    handleCloseDeleteModal,
    isLoadingDelete,
    categories,
    searchTerm,
    handleChangeSearchTerm,
    hasError,
    filteredCategories,
    handleTryAgain,
    orderBy,
    handleToggleOrderBy,
    handleDeleteCategory,
  } = useCategories();

  const hasCategories = categories.length > 0;
  const hasFilteredCategories = filteredCategories.length > 0;
  const isListEmpty = (!hasError && !isLoading && !hasCategories);
  const isSearchEmpty = (!hasError && hasCategories && !hasFilteredCategories);

  return (
    <Container>
      <Loader isLoading={isLoading} />

      {categories.length > 0 && (
        <InputSearch value={searchTerm} onChange={handleChangeSearchTerm} />
      )}

      <PageHeader
        hasError={hasError}
        listQuantity={categories.length}
        filteredListQuantity={filteredCategories.length}
        label="categoria"
        linkTo="/categories/new"
        linkLabel="Nova Categoria"
      />

      {hasError && (
        <ErrorStatus
          title="Ocorreu um erro ao obter as suas categorias"
          onTryAgain={handleTryAgain}
        />
      )}

      {isListEmpty && (
        <EmptyList>
          Você ainda não tem nenhuma categoria cadastrada!
          Clique no botão <strong>”Nova categoria”</strong> acima
          para cadastrar a sua primeira!
        </EmptyList>
      )}

      {isSearchEmpty && <SearchNotFound searchTerm={searchTerm} />}

      {hasFilteredCategories && (
        <>
          <CategoriesList
            categories={filteredCategories}
            orderBy={orderBy}
            onToggleOrderBy={handleToggleOrderBy}
            onDeleteCategory={handleDeleteCategory}
          />

          <Modal
            $danger
            visible={isDeleteModalVisible}
            title={`Tem certeza que deseja remover a categoria "${categoryBeingDeleted?.name}"?`}
            confirmLabel="Deletar"
            onConfirm={handleConfirmDeleteCategory}
            onCancel={handleCloseDeleteModal}
            isLoading={isLoadingDelete}
          >
            <p>Essa acão não poderá ser desfeita!</p>
          </Modal>
        </>
      )}

    </Container>
  );
}
