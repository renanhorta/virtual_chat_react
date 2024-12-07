import { useState } from "react";
import { Link } from "react-router-dom";
import CustomUserForm from "../../components/Form/CustomForm";

export default function UserForm() {
  return (
    <div>
      <CustomUserForm />
      {/* Renderizar o link a seguir caso tenha algum perfil no localStorage */}
      <Link to={"/usuarios"}>Voltar a Lista de usuários</Link>
    </div>
  );
}
