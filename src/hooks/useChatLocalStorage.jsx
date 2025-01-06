import { useCallback } from "react";

export const useChatLocalStorage = (key) => {
  const addMessage = useCallback(
    // add a new message in the array of messages or create one empty arry to add the new message.
    (message) => {
      try {
        const storedMessages =
          JSON.parse(window.localStorage.getItem(key)) || [];
        storedMessages.push({
          time: new Date().toISOString(),
          ...message, // The message need to have 'author' e 'content'
        });
        window.localStorage.setItem(key, JSON.stringify(storedMessages));
      } catch (error) {
        console.error("Error adding message:", error);
      }
    },
    [key]
  );

  const getMessages = useCallback(() => {
    // return all the messages in the LocalStorage.
    try {
      const storedMessages = window.localStorage.getItem(key);
      return storedMessages ? JSON.parse(storedMessages) : [];
    } catch (error) {
      console.error("Error retrieving messages:", error);
      return [];
    }
  }, [key]);

  const deleteMessage = useCallback(
    (timestamp) => {
      // Remove one selected message in the chat
      try {
        const storedMessages =
          JSON.parse(window.localStorage.getItem(key)) || [];
        const updatedMessages = storedMessages.filter(
          (message) => message.time !== timestamp
        );
        window.localStorage.setItem(key, JSON.stringify(updatedMessages));
      } catch (error) {
        console.error("Error deleting message:", error);
      }
    },
    [key]
  );

  const clearChat = useCallback(() => {
    // Remove all the messages in the chat
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error("Error clearing chat:", error);
    }
  }, [key]);

  return {
    addMessage,
    getMessages,
    deleteMessage,
    clearChat,
  };
};
