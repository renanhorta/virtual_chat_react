import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import styles from "./UsersList.module.css";

export default function UsersList() {
  // get the profile inthe localStorage, with the custom hook.
  const { getItem } = useLocalStorage("Profiles");
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    // get the value in the localStorage with the "Profiles" key
    const storedProfiles = getItem();
    if (storedProfiles) {
      setProfiles(storedProfiles);
    }
  }, []);

  return (
    <div className={styles.container}>
      <h2>Lista de Usuários</h2>
      {(!profiles || profiles.length == 0) && (
        <p>Nenhum perfil encontrado. Volte para a página de cadastro.</p>
      )}
      <Link to={"/cadastro"} className={styles.link}>
        Cadastrar um novo usuário
      </Link>
      <ul className={styles.list}>
        {profiles?.map((user) => (
          <li key={user.id} className={styles.listItem}>
            <Link to={`/chat/${user.id}`}>
              <p>Nome: {user.name}</p>
              <p>idade: {user.age}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
