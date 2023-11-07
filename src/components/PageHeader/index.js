/* eslint-disable no-nested-ternary */
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Container } from './styles';

export default function PageHeader({
  hasError,
  listQuantity,
  filteredListQuantity,
  label,
  linkTo,
  linkLabel,
}) {
  return (
    <Container
      $justifyContent={
        listQuantity > 0
          ? 'space-between'
          : 'center'
      }
    >
      {(!hasError && listQuantity > 0) && (
        <strong>
          {filteredListQuantity}
          {filteredListQuantity === 1 ? ` ${label}` : ` ${label}s`}
        </strong>
      )}
      <Link to={linkTo}>{linkLabel}</Link>
    </Container>
  );
}

PageHeader.propTypes = {
  hasError: PropTypes.bool.isRequired,
  listQuantity: PropTypes.number.isRequired,
  filteredListQuantity: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  linkTo: PropTypes.string.isRequired,
  linkLabel: PropTypes.string.isRequired,
};
