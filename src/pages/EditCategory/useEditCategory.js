import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import CategoriesService from '../../services/CategoriesService';
import toast from '../../utils/toast';
import useSafeAsyncAction from '../../hooks/useSafeAsyncAction';

export default function useEditCategory() {
  const [isLoading, setIsLoading] = useState(true);
  const [categoryName, setCategoryName] = useState('');

  const categoryFormRef = useRef(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const safeAsyncAction = useSafeAsyncAction();

  useEffect(() => {
    const controller = new AbortController();

    async function loadCategory(signal) {
      try {
        const category = await CategoriesService.getCategoryById(id, signal);

        safeAsyncAction(() => {
          categoryFormRef.current.setFieldsValues(category);
          setCategoryName(category.name);
          setIsLoading(false);
        });
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return;
        }

        safeAsyncAction(() => {
          navigate('/categories', { replace: true });
          toast({
            type: 'danger',
            text: 'Categoria não encontrada',
          });
        });
      }
    }

    loadCategory(controller.signal);

    return () => {
      controller.abort();
    };
  }, [id, navigate, safeAsyncAction]);

  async function handleSubmit(category) {
    try {
      const updatedCategory = await CategoriesService.updateCategory(id, category);
      setCategoryName(updatedCategory.name);

      toast({
        type: 'success',
        text: 'Categoria editada com sucesso!',
      });
    } catch (error) {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao editar a categoria',
      });
    }
  }

  return {
    isLoading,
    categoryName,
    categoryFormRef,
    handleSubmit,
  };
}
