import React from 'react';
import useDebounce from './useDebounce';

const useWindowWidth = () => {
  const getWindowWidth = () => {
    const width = window.innerWidth;
    return width;
  }

  const [windowWidth, setWindowWidth] = React.useState(getWindowWidth());

  const handleResize = () => {
    setWindowWidth(getWindowWidth());
  }

  const debounceHandleResize = useDebounce(handleResize, 300);

  React.useEffect(() => {
    window.addEventListener('resize', debounceHandleResize);
    return () => window.removeEventListener('resize', debounceHandleResize);
  }, [debounceHandleResize]);

  return windowWidth;
};

export default useWindowWidth;
