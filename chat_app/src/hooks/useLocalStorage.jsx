export const useLocalStorage = (key) => {
  const setItem = (value) => {
    //takes the existing list in localStorage (if there is one). If there is nothing, it starts with an empty list.
    //The user is then added to this list, and the list is saved back to localStorage.

    try {
      const storedData = JSON.parse(window.localStorage.getItem(key)) || [];
      storedData.push(value);
      window.localStorage.setItem(key, JSON.stringify(storedData));
    } catch (error) {
      console.log(error);
    }
  };

  const getItem = () => {
    //Returns the entire list of users that are stored in localStorage, or an empty list if there is no data or if an error occurs.

    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        return JSON.parse(item);
      }
      return [];
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const removeItem = (value) => {
    //receives an object (chosen by id), finds that user in the list and removes it. The updated list is then saved back to localStorage.
    try {
      const storedData = JSON.parse(window.localStorage.getItem(key)) || [];
      const updatedData = storedData.filter((user) => user.id !== value.id);
      window.localStorage.setItem(key, JSON.stringify(updatedData));
    } catch (error) {
      console.log(error);
    }
  };

  return { setItem, getItem, removeItem };
};
