import PropTypes from 'prop-types';
import { Container } from './styles';

import emptyBox from '../../assets/images/empty-box.svg';

export default function EmptyList({ children }) {
  return (
    <Container>
      <img src={emptyBox} alt="Empty box" />
      <p>
        {children}
      </p>
    </Container>
  );
}

EmptyList.propTypes = {
  children: PropTypes.node.isRequired,
};
