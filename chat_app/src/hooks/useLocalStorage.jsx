export const useLocalStorage = (key) => {
  const setItem = (value) => {
    window.localStorage.setItem(key, JSON.stringify(value));
  };

  return { setItem };
};

const setLocalItem = () => {
  useEffect(() => {
    localStorage.setItem("list-profile", JSON.stringify());
  }, []);
};

const getLocalItem = () => {
  useEffect(() => {
    localStorage.setItem("list-profile", JSON.stringify());
  }, []);
};

const editLocalItem = () => {
  useEffect(() => {
    localStorage.setItem("list-profile", JSON.stringify());
  }, []);
};
