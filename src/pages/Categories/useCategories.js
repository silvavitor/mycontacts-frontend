import {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import CategoriesService from '../../services/CategoriesService';
import toast from '../../utils/toast';

export default function useCategories() {
  const [categories, setCategories] = useState([]);
  const [orderBy, setOrderBy] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [categoryBeingDeleted, setCategoryBeingDeleted] = useState();
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  const filteredCategories = useMemo(() => categories.filter((category) => (
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
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

  function handleDeleteCategory(category) {
    setCategoryBeingDeleted(category);
    setIsDeleteModalVisible(true);
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalVisible(false);
  }

  async function handleConfirmDeleteCategory() {
    try {
      setIsLoadingDelete(true);
      await CategoriesService.deleteCategory(categoryBeingDeleted.id);

      setCategories((prevState) => prevState.filter(
        (categorie) => categorie.id !== categoryBeingDeleted.id,
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

  return {
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
  };
}
