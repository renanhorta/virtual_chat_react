import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CustomUserForm from "../../components/Form/CustomForm";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import styles from "./UserForm.module.css";

export default function UserForm() {
  const { getItem } = useLocalStorage("Profiles");
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    // check if are some data in the localStorage
    const storedProfiles = getItem();
    if (storedProfiles) {
      setProfiles(storedProfiles);
    }
  }, [getItem]);

  return (
    <div className={styles.container}>
      {profiles.length != 0 && (
        <Link to={"/usuarios"} className={styles.link}>
          Voltar a lista de usuários
        </Link>
      )}
      <CustomUserForm />
    </div>
  );
}
