import { useState, useImperativeHandle } from 'react';

import useErrors from '../../hooks/useErrors';

export default function useCategoryForm(onSubmit, ref) {
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useImperativeHandle(ref, () => ({
    setFieldsValues: (category) => {
      setName(category.name ?? '');
    },
    resetFields: () => {
      setName('');
    },
  }));

  const {
    errors,
    setError,
    removeError,
    getErrorMessageByFieldName,
  } = useErrors();

  const isFormValid = (name && errors.length === 0);

  function handleNameChange(event) {
    const nameValue = event.target.value;
    setName(nameValue);

    if (!nameValue) {
      setError({ field: 'name', message: 'Nome é obrigatorio.' });
    } else {
      removeError('name');
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setIsSubmitting(true);

    await onSubmit({
      name,
    });

    setIsSubmitting(false);
  }
  return {
    handleSubmit,
    getErrorMessageByFieldName,
    name,
    handleNameChange,
    isSubmitting,
    isFormValid,
  };
}
