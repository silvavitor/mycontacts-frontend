import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Container } from './styles';

import arrow from '../../assets/images/icons/arrow.svg';

export default function PageHeader({ title, backPath }) {
  return (
    <Container>
      <Link to={backPath}>
        <img src={arrow} alt="Back" />
        <span>Voltar</span>
      </Link>

      <h1>{title}</h1>
    </Container>
  );
}

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  backPath: PropTypes.string.isRequired,
};
