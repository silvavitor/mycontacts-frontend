import PropTypes from 'prop-types';
import { memo } from 'react';
import ListHeader from '../../../../components/ListHeader';
import Card from '../Card';

function ContactsList({
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
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string,
    phone: PropTypes.string,
    category: PropTypes.shape({
      name: PropTypes.string,
    }),
  })).isRequired,
  orderBy: PropTypes.string.isRequired,
  onToggleOrderBy: PropTypes.func.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};

export default memo(ContactsList);
