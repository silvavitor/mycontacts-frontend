import PropTypes from 'prop-types';
import ListHeader from '../../../../components/ListHeader';
import Card from '../Card';

export default function ContactsList({
  contacts, orderBy, onToggleOrderBy, onDeleteContact,
}) {
  return (
    <>
      <ListHeader orderBy={orderBy} onToggleOrderBy={onToggleOrderBy} />

      {contacts.map((contact) => (
        <Card key={contact.id} contact={contact} onDeleteContact={onDeleteContact} />
      ))}
    </>
  );
}

ContactsList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string,
    phone: PropTypes.string,
    category: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  })).isRequired,
  orderBy: PropTypes.string.isRequired,
  onToggleOrderBy: PropTypes.func.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};
