// toolpadRouter.js
export function createToolpadRouter(navigate, location) {
  return {
    pathname: location.pathname,
    searchParams: new URLSearchParams(location.search),
    navigate: (path) => {
      if (location.pathname !== path) {
        navigate(path);
      }
    },
  };
}
