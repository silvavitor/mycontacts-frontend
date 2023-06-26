import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Container } from './styles';

import edit from '../../../../assets/images/icons/edit.svg';
import trash from '../../../../assets/images/icons/trash.svg';

export default function Card({ contact, onDeleteContact }) {
  return (
    <Container>
      <div className="info">
        <div className="contact-title">
          <strong>{contact.name}</strong>
          {contact.category.name && (<small>{contact.category.name}</small>)}
        </div>
        <span>{contact.email}</span>
        <span>{contact.phone}</span>
      </div>

      <div className="actions">
        <Link to={`edit/${contact.id}`}>
          <img src={edit} alt="Edit" />
        </Link>
        <button
          type="button"
          onClick={() => onDeleteContact(contact)}
        >
          <img src={trash} alt="Trash" />
        </button>
      </div>
    </Container>
  );
}

Card.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string,
    phone: PropTypes.string,
    category: PropTypes.shape({
      name: PropTypes.string,
    }),
  }).isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};
