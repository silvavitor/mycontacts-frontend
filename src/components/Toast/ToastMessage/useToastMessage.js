import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';

export default function useToastMessage(message, isLeaving, onRemoveMessage, onAnimationEnd) {
  const animatedElementRef = useRef(null);

  useEffect(() => {
    function handleAnimationEnd() {
      onAnimationEnd(message.id);
    }

    const elementRef = animatedElementRef.current;

    if (isLeaving) {
      elementRef.addEventListener('animationend', handleAnimationEnd);
    }

    return () => {
      elementRef.removeEventListener('animationend', handleAnimationEnd);
    };
  }, [isLeaving, message.id, onAnimationEnd]);

  useEffect(() => {
    const timeoutId = setTimeout(() => { onRemoveMessage(message.id); }, message.duration || 7000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [message, onRemoveMessage]);

  function handleRemoveToast() {
    onRemoveMessage(message.id);
  }

  return { handleRemoveToast, animatedElementRef };
}

useToastMessage.propTypes = {
  message: PropTypes.string.isRequired,
  isLeaving: PropTypes.bool.isRequired,
  onRemoveMessage: PropTypes.func.isRequired,
  onAnimationEnd: PropTypes.func.isRequired,
};
