import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocalStorage } from "../../hooks/useLocalStorage";

// const MOCKLIST = [{
//     id:new Date().getTime()+1,
//     name:"fulano",
//     image:"",
//     email:"fulano@gmail.com",
//     age: 20,
// }, }]

export default function UsersList() {
  // get the profile inthe localStorage, with the custom hook.
  const { getItem } = useLocalStorage("Profiles");
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    // get the value in the localStorage with the "Profiles" key
    const storedProfiles = getItem();
    console.log(storedProfiles);

    if (storedProfiles) {
      setProfiles(storedProfiles);
    }
  }, [getItem]);

  return (
    <div>
      <h2>Lista de Usuários</h2>
      {(!profiles || profiles.length == 0) && (
        <p>Nenhum perfil encontrado. Volte para a página de cadastro.</p>
      )}
      <Link to={"/cadastro"}>Cadastrar um novo usuário</Link>
      <ul>
        {profiles?.map((user) => (
          <li key={user.id}>
            <Link to={`/chat`}></Link>
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
