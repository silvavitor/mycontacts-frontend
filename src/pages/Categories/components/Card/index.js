import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import { Container } from './styles';

import edit from '../../../../assets/images/icons/edit.svg';
import trash from '../../../../assets/images/icons/trash.svg';

export default function Card({ category, onDeleteCategory }) {
  return (
    <Container>
      <div className="category-title">
        <strong>{category.name}</strong>
      </div>

      <div className="actions">
        <Link to={`categories/edit/${category.id}`}>
          <img src={edit} alt="Edit" />
        </Link>
        <button
          type="button"
          onClick={() => onDeleteCategory(category)}
        >
          <img src={trash} alt="Trash" />
        </button>
      </div>
    </Container>
  );
}

Card.propTypes = {
  category: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  onDeleteCategory: PropTypes.func.isRequired,
};
