import PropTypes from 'prop-types';
import { useEffect } from 'react';

export default function useToastMessage(message, isLeaving, onRemoveMessage) {
  useEffect(() => {
    const timeoutId = setTimeout(() => { onRemoveMessage(message.id); }, message.duration || 7000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [message, onRemoveMessage]);

  function handleRemoveToast() {
    onRemoveMessage(message.id);
  }

  return { handleRemoveToast };
}

useToastMessage.propTypes = {
  message: PropTypes.string.isRequired,
  isLeaving: PropTypes.bool.isRequired,
  onRemoveMessage: PropTypes.func.isRequired,
  onAnimationEnd: PropTypes.func.isRequired,
};
