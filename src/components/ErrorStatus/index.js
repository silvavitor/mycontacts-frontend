import PropTypes from 'prop-types';
import Button from '../Button';
import sad from '../../assets/images/sad.svg';
import { Container } from './styles';

export default function ErrorStatus({ title, onTryAgain, label = 'Tentar Novamente' }) {
  return (
    <Container>
      <img src={sad} alt="sad" />
      <div className="details">
        <strong>{title}</strong>
        <Button type="button" onClick={onTryAgain}>{label}</Button>
      </div>
    </Container>
  );
}

ErrorStatus.propTypes = {
  title: PropTypes.string.isRequired,
  onTryAgain: PropTypes.func.isRequired,
  label: PropTypes.string,
};
