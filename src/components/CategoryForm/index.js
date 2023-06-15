import PropTypes from 'prop-types';
import {
  useState, forwardRef, useImperativeHandle,
} from 'react';

import useErrors from '../../hooks/useErrors';

import { Form, ButtonContainer } from './styles';

import FormGroup from '../FormGroup';
import Input from '../Input';
import Button from '../Button';

const CategoryForm = forwardRef(({ buttonLabel, onSubmit }, ref) => {
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

  return (
    <Form onSubmit={handleSubmit} noValidate>
      {/* Nome */}
      <FormGroup error={getErrorMessageByFieldName('name')}>
        <Input
          error={getErrorMessageByFieldName('name')}
          placeholder="Nome*"
          value={name}
          onChange={handleNameChange}
          disabled={isSubmitting}
        />
      </FormGroup>
      <ButtonContainer>
        <Button type="submit" disabled={!isFormValid} isLoading={isSubmitting}>
          {buttonLabel}
        </Button>
      </ButtonContainer>
    </Form>
  );
});

CategoryForm.displayName = 'ContactForm';

CategoryForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default CategoryForm;
