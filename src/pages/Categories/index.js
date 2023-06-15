/* eslint-disable no-nested-ternary */
import {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  InputSearchContainer,
  Header,
  ErrorContainer,
  EmptyListContainer,
  SearchNotFoundContainer,
  ListHeader,
  Card,
} from './styles';
import CategoriesService from '../../services/CategoriesService';

import Loader from '../../components/Loader';
import Button from '../../components/Button';
import Modal from '../../components/Modal';

import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';
import sad from '../../assets/images/sad.svg';
import emptyBox from '../../assets/images/empty-box.svg';
import magnifierQuestion from '../../assets/images/magnifier-question.svg';
import toast from '../../utils/toast';

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [orderBy, setOrderBy] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [categorieBeingDeleted, setCategorieBeingDeleted] = useState();
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  const fileredCategories = useMemo(() => categories.filter((contact) => (
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  )), [categories, searchTerm]);

  const loadCategories = useCallback(async () => {
    try {
      setIsLoading(true);

      const categoriesList = await CategoriesService.listCategories(orderBy);

      setCategories(categoriesList);
      setHasError(false);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, [orderBy]);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  function handleChangeSearchTerm(event) {
    setSearchTerm(event.target.value);
  }

  function handleTryAgain() {
    loadCategories();
  }

  function handleToggleOrderBy() {
    setOrderBy((prevState) => (prevState === 'asc' ? 'desc' : 'asc'));
  }

  function handleDeleteCategorie(contact) {
    setCategorieBeingDeleted(contact);
    setIsDeleteModalVisible(true);
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalVisible(false);
  }

  async function handleConfirmDeleteContact() {
    try {
      setIsLoadingDelete(true);
      await CategoriesService.deleteCategory(categorieBeingDeleted.id);

      setCategories((prevState) => prevState.filter(
        (categorie) => categorie.id !== categorieBeingDeleted.id,
      ));

      toast({
        type: 'success',
        text: 'Categoria deleteda com sucesso!',
      });
    } catch (error) {
      if (error.response.status === 403) {
        toast({
          type: 'danger',
          text: 'Não foi possível deletar a categoria pois está atrelada a um contato!',
        });
      } else {
        toast({
          type: 'danger',
          text: 'Ocorreu um erro ao deletar a categoria!',
        });
      }
    } finally {
      setIsLoadingDelete(false);
      handleCloseDeleteModal();
    }
  }

  return (
    <Container>
      <Loader isLoading={isLoading} />

      <Modal
        danger
        visible={isDeleteModalVisible}
        title={`Tem certeza que deseja remover a categoria "${categorieBeingDeleted?.name}"?`}
        confirmLabel="Deletar"
        onConfirm={handleConfirmDeleteContact}
        onCancel={handleCloseDeleteModal}
        isLoading={isLoadingDelete}
      >
        <p>Essa acão não poderá ser desfeita!</p>
      </Modal>
      {categories.length > 0 && (
        <InputSearchContainer>
          <input
            value={searchTerm}
            type="text"
            placeholder="Pesquise pelo nome..."
            onChange={handleChangeSearchTerm}
          />
        </InputSearchContainer>
      )}

      <Header
        justifyContent={
          hasError
            ? 'flex-end'
            : (
              categories.length > 0
                ? 'space-between'
                : 'center'
            )
        }
      >
        {(!hasError && categories.length > 0) && (
          <strong>
            {fileredCategories.length}
            {fileredCategories.length === 1 ? ' categoria' : ' categorias'}
          </strong>
        )}
        <Link to="/categories/new">Nova Categoria</Link>
      </Header>

      {hasError && (
        <ErrorContainer>
          <img src={sad} alt="sad" />
          <div className="details">
            <strong>Ocorreu um erro ao obter as suas categorias</strong>
            <Button type="button" onClick={handleTryAgain}>Tentar novamente</Button>
          </div>
        </ErrorContainer>
      )}

      {!hasError && (
        <>
          {(categories.length < 1 && !isLoading) && (
            <EmptyListContainer>
              <img src={emptyBox} alt="Empty box" />
              <p>
                Você ainda não tem nenhuma categoria cadastrada!
                Clique no botão
                {' '}
                <strong>”Novo categoria</strong>
                {' '}
                à cima
                para cadastrar a sua primeira!
              </p>
            </EmptyListContainer>
          )}

          {(categories.length > 0 && fileredCategories < 1) && (
            <SearchNotFoundContainer>
              <img src={magnifierQuestion} alt="Magnifier Question" />

              <span>
                Nenhum resultado encontrado para
                {' '}
                <strong>
                  &ldquo;
                  {searchTerm}
                  &rdquo;
                </strong>
              </span>
            </SearchNotFoundContainer>
          )}

          {fileredCategories.length > 0 && (
            <ListHeader orderBy={orderBy}>
              <button type="button" onClick={handleToggleOrderBy}>
                <span>Nome</span>
                <img src={arrow} alt="Arrow" />
              </button>
            </ListHeader>
          )}

          {fileredCategories.map((categorie) => (
            <Card key={categorie.id}>
              <div className="info">
                <div className="categorie-title">
                  <strong>{categorie.name}</strong>
                </div>
              </div>

              <div className="actions">
                <Link to={`categories/edit/${categorie.id}`}>
                  <img src={edit} alt="Edit" />
                </Link>
                <button
                  type="button"
                  onClick={() => handleDeleteCategorie(categorie)}
                >
                  <img src={trash} alt="Trash" />
                </button>
              </div>
            </Card>
          ))}
        </>
      )}

    </Container>
  );
}
