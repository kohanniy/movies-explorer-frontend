import React from 'react';
// import useDebounce from './useDebounce';

const useWindowWidth = () => {
  const getWindowWidth = () => {
    const width = window.innerWidth;
    return width;
  }

  const [windowWidth, setWindowWidth] = React.useState(getWindowWidth());

  // const debounceHandleResize = useDebounce(handleResize, 200);

  React.useEffect(() => {
    const handleResize = () => {
      setWindowWidth(getWindowWidth());
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowWidth;
}

export default useWindowWidth;
