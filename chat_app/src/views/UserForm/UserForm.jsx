import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CustomUserForm from "../../components/Form/CustomForm";
import { useLocalStorage } from "../../hooks/useLocalStorage";

export default function UserForm() {
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
      {/* Renderizar o link a seguir caso tenha algum perfil no localStorage */}
      {profiles.length != 0 && (
        <Link to={"/usuarios"}>Voltar a lista de usuários</Link>
      )}
      <CustomUserForm />
    </div>
  );
}
