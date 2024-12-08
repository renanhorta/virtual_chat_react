import { useState, useCallback, useEffect } from "react";

export const useLocalStorage = (key) => {
  const setItem = useCallback(
    (value) => {
      //takes the existing list in localStorage (if there is one). If there is nothing, it starts with an empty list.
      //The profile is added to this list, and the list is saved back to localStorage.

      try {
        const storedData = JSON.parse(window.localStorage.getItem(key)) || [];
        storedData.push(value);
        window.localStorage.setItem(key, JSON.stringify(storedData));
      } catch (error) {
        console.log(error);
      }
    },
    [key]
  );

  const getItem = useCallback(() => {
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
  }, [key]);

  const getProfile = useCallback(
    (profileId) => {
      //Return a selected item in the list in LocalStorage
      try {
        const storedList =
          JSON.parse(window.localStorage.getItem("Profiles")) || [];

        const filteredProfile = storedList.filter(
          (profile) => String(profile.id) === String(profileId)
        );

        // return the frist item with the same ID or undefined
        return filteredProfile.length > 0 ? filteredProfile[0] : undefined;
      } catch (error) {
        console.log(error);
        return undefined;
      }
    },
    [key]
  );

  const updateProfile = useCallback(
    (id, updatedProfile) => {
      try {
        const storedProfiles =
          JSON.parse(window.localStorage.getItem(key)) || [];
        const updatedProfiles = storedProfiles.map((profile) =>
          String(profile.id) === String(id) ? updatedProfile : profile
        );
        window.localStorage.setItem(key, JSON.stringify(updatedProfiles));
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    },
    [key]
  );

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

  return { setItem, getItem, getProfile, updateProfile, removeItem };
};
