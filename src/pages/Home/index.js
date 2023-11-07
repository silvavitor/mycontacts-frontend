/* eslint-disable react/jsx-one-expression-per-line */
import { Container } from './styles';

import Loader from '../../components/Loader';
import Modal from '../../components/Modal';

import useHome from './useHome';
import InputSearch from '../../components/InputSearch';
import PageHeader from '../../components/PageHeader';
import ErrorStatus from '../../components/ErrorStatus';
import SearchNotFound from '../../components/SearchNotFound';
import EmptyList from '../../components/EmptyList';
import ContactsList from './components/ContactsList';

export default function Home() {
  const {
    isLoading,
    isDeleteModalVisible,
    contactBeingDeleted,
    handleConfirmDeleteContact,
    handleCloseDeleteModal,
    isLoadingDelete,
    contacts,
    searchTerm,
    handleChangeSearchTerm,
    hasError,
    filteredContacts,
    handleTryAgain,
    orderBy,
    handleToggleOrderBy,
    handleDeleteContact,
  } = useHome();

  const hasContacts = contacts.length > 0;
  const hasFilteredContacts = filteredContacts.length > 0;
  const isListEmpty = (!hasError && !isLoading && !hasContacts);
  const isSearchEmpty = (!hasError && hasContacts && !hasFilteredContacts);

  return (
    <Container>

      <Loader isLoading={isLoading} />

      {hasContacts && <InputSearch value={searchTerm} onChange={handleChangeSearchTerm} />}

      <PageHeader
        hasError={hasError}
        listQuantity={contacts.length}
        filteredListQuantity={filteredContacts.length}
        label="contato"
        linkTo="/new"
        linkLabel="Novo contato"
      />

      {hasError && (
        <ErrorStatus
          title="Ocorreu um erro ao obter os seus contatos"
          onTryAgain={handleTryAgain}
        />
      )}

      {isListEmpty && (
        <EmptyList>
          Você ainda não tem nenhum contato cadastrado!
          Clique no botão <strong>”Novo contato”</strong> acima
          para cadastrar o seu primeiro!
        </EmptyList>
      )}

      {isSearchEmpty && <SearchNotFound searchTerm={searchTerm} />}

      {hasFilteredContacts && (
        <>
          <ContactsList
            contacts={filteredContacts}
            orderBy={orderBy}
            onToggleOrderBy={handleToggleOrderBy}
            onDeleteContact={handleDeleteContact}
          />

          <Modal
            $danger
            visible={isDeleteModalVisible}
            title={`Tem certeza que deseja remover o contato "${contactBeingDeleted?.name}"?`}
            confirmLabel="Deletar"
            onConfirm={handleConfirmDeleteContact}
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
