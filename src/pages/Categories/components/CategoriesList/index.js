import PropTypes from 'prop-types';
import ListHeader from '../../../../components/ListHeader';
import Card from '../Card';

export default function CategoriesList({
  categories, orderBy, onToggleOrderBy, onDeleteCategory,
}) {
  return (
    <>
      <ListHeader orderBy={orderBy} onToggleOrderBy={onToggleOrderBy} />

      {categories.map((category) => (
        <Card key={category.id} category={category} onDeleteCategory={onDeleteCategory} />
      ))}
    </>
  );
}

CategoriesList.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  orderBy: PropTypes.string.isRequired,
  onToggleOrderBy: PropTypes.func.isRequired,
  onDeleteCategory: PropTypes.func.isRequired,
};
