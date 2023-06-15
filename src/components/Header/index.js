import { Link } from 'react-router-dom';
import { Container, Menu } from './styles';

import logo from '../../assets/images/logo.svg';
import Button from '../Button';

export default function Header() {
  return (
    <Container>
      <Link to="/">
        <img src={logo} alt="My Contacts" />
      </Link>
      <Menu>
        <Button>
          <Link to="/">Contatos</Link>
        </Button>
        <Button>
          <Link to="/categories">Categorias</Link>
        </Button>
      </Menu>
    </Container>
  );
}
