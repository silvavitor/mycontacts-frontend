import { Container } from './styles';
import ToastMessage from '../ToastMessage';
import useToastContainer from './useToastContainer';

export default function ToastContainer() {
  const {
    renderList,
    handleRemoveItem,
  } = useToastContainer();

  return (
    <Container>
      {renderList((message, { isLeaving, animatedRef }) => (
        <ToastMessage
          key={message.id}
          message={message}
          onRemoveMessage={handleRemoveItem}
          isLeaving={isLeaving}
          animatedRef={animatedRef}
        />
      ))}
    </Container>
  );
}
