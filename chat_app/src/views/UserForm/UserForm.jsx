import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CustomUserForm from "../../components/Form/CustomForm";
import { useLocalStorage } from "../../hooks/useLocalStorage";

export default function UserForm() {
  const { getItem } = useLocalStorage("Profiles");
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    // check if are some data in the localStorage
    const storedProfiles = getItem();
    if (storedProfiles) {
      setProfiles(storedProfiles);
    }
  }, []);

  useEffect(() => {
    if (profiles.length > 0) {
      setProfiles(profiles);
    }
  }, [profiles]);

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
