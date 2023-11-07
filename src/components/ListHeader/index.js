import PropTypes from 'prop-types';
import arrow from '../../assets/images/icons/arrow.svg';
import { Header } from './styles';

export default function ListHeader({ orderBy, onToggleOrderBy }) {
  return (
    <Header $orderBy={orderBy}>
      <button type="button" onClick={onToggleOrderBy}>
        <span>Nome</span>
        <img src={arrow} alt="Arrow" />
      </button>
    </Header>
  );
}
ListHeader.propTypes = {
  orderBy: PropTypes.string.isRequired,
  onToggleOrderBy: PropTypes.func.isRequired,
};
