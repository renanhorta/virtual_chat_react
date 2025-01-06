import { useEffect, useState } from "react";
import UserForm from "../UserForm/UserForm";
import UsersList from "../UsersList/UsersList";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import styles from "./Home.module.css";

export default function Home() {
  const [profiles, setProfiles] = useState([]);
  const { getItem } = useLocalStorage("Profiles");

  useEffect(() => {
    // get the value in the localStorage with the "Profiles" key
    const storedProfiles = getItem();
    if (storedProfiles) {
      setProfiles(storedProfiles);
    }
  }, []);

  return (
    <div className={styles.container}>
      {!profiles || profiles.length == 0 ? <UserForm /> : <UsersList />}
    </div>
  );
}
