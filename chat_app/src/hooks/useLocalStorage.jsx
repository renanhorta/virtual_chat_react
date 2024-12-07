import { useState } from "react";

export const useLocalStorage = (key) => {
  const setItem = (value) => {
    //takes the existing list in localStorage (if there is one). If there is nothing, it starts with an empty list.
    //The profile is added to this list, and the list is saved back to localStorage.

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

  const getProfile = (profileId) => {
    //Return a selected item in the list in LocalStorage
    try {
      const storedList =
        JSON.parse(window.localStorage.getItem("Profiles")) || [];

      const filteredProfile = storedList.filter(
        (profile) => profile.id == profileId //it can't be a search for identical parameters (===) because one is stored as a number and the other as a string
      );

      // return the frist item with the same ID or undefined
      return filteredProfile.length > 0 ? filteredProfile[0] : undefined;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  };

  const updateProfile = (id, updatedProfile) => {
    const storedProfiles =
      JSON.parse(window.localStorage.getItem("Profiles")) || [];
    const updatedProfiles = storedProfiles.map((profile) =>
      profile.id === id ? updatedProfile : profile
    );
    window.localStorage.setItem("Profiles", JSON.stringify(updatedProfiles));
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

  return { setItem, getItem, getProfile, updateProfile, removeItem };
};
