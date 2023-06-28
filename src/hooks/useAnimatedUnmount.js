import { useEffect, useRef, useState } from 'react';

export default function useAnimatedUnmount(visible) {
  const [shouldRender, setShouldRender] = useState(visible);

  const animatedElementRef = useRef(null);

  useEffect(() => {
    function handleAnimationEnd() {
      setShouldRender(false);
    }

    const elementRef = animatedElementRef.current;

    if (visible) {
      setShouldRender(true);
    } else if (elementRef) {
      elementRef.addEventListener('animationend', () => {
        handleAnimationEnd();
      });
    }

    return () => {
      if (elementRef) {
        elementRef.removeEventListener('animationend', handleAnimationEnd);
      }
    };
  }, [visible]);

  return { shouldRender, animatedElementRef };
}
