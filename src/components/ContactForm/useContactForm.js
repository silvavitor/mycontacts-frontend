import {
  useState, useEffect, useImperativeHandle,
} from 'react';

import isEmailValid from '../../utils/isEmailValid';
import formatPhone from '../../utils/formatPhone';
import useErrors from '../../hooks/useErrors';
import useSafeAsyncState from '../../hooks/useSafeAsyncState';
import CategoriesService from '../../services/CategoriesService';

export default function useContactForm(onSubmit, ref) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useSafeAsyncState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useSafeAsyncState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useImperativeHandle(ref, () => ({
    setFieldsValues: (contact) => {
      setName(contact.name ?? '');
      setEmail(contact.email ?? '');
      setPhone(formatPhone(contact.phone ?? ''));
      setCategoryId(contact.category.id ?? '');
    },
    resetFields: () => {
      setName('');
      setEmail('');
      setPhone('');
      setCategoryId('');
    },
  }));

  const {
    errors,
    setError,
    removeError,
    getErrorMessageByFieldName,
  } = useErrors();

  const isFormValid = (name && errors.length === 0);

  useEffect(() => {
    async function loadCategories() {
      try {
        const categoriesList = await CategoriesService.listCategories();
        setCategories(categoriesList);
      } catch { } finally {
        setIsLoadingCategories(false);
      }
    }

    loadCategories();
  }, [setCategories, setIsLoadingCategories]);

  function handleNameChange(event) {
    const nameValue = event.target.value;
    setName(nameValue);

    if (!nameValue) {
      setError({ field: 'name', message: 'Nome é obrigatorio.' });
    } else {
      removeError('name');
    }
  }

  function handleEmailChange(event) {
    const emailValue = event.target.value;
    setEmail(emailValue);

    if ((emailValue) && (!isEmailValid(emailValue))) {
      setError({ field: 'email', message: 'E-mail inválido.' });
    } else {
      removeError('email');
    }
  }

  function handlePhoneChange(event) {
    const phoneValue = formatPhone(event.target.value);
    setPhone(phoneValue);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setIsSubmitting(true);

    await onSubmit({
      name, email, phone, categoryId,
    });

    setIsSubmitting(false);
  }
  return {
    handleSubmit,
    getErrorMessageByFieldName,
    name,
    handleNameChange,
    isSubmitting,
    email,
    handleEmailChange,
    phone,
    handlePhoneChange,
    isLoadingCategories,
    categoryId,
    setCategoryId,
    categories,
    isFormValid,
  };
}
