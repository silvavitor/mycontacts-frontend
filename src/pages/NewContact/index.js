import ContactForm from '../../components/ContactForm';
import PageFormHeader from '../../components/PageFormHeader';
import useNewContact from './useNewContact';

export default function NewContact() {
  const {
    contactFormRef,
    handleSubmit,
  } = useNewContact();

  return (
    <>
      <PageFormHeader title="Novo Contato" backPath="/" />
      <ContactForm
        ref={contactFormRef}
        buttonLabel="Cadastrar"
        onSubmit={handleSubmit}
      />
    </>
  );
}
