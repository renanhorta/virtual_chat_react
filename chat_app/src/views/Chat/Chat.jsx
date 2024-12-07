import React from "react";
import { Link, useParams } from "react-router-dom";
import { useLocalStorage } from "../../hooks/useLocalStorage";

export default function Chat() {
  const params = useParams();
  const userID = params.userId;
  const { getProfile, updateProfile } = useLocalStorage("Profile");
  const user = getProfile(userID);
  const [messageContent, setMessageContent] = useState("");

  if (!user) {
    return (
      <div>
        <h2>Perfil não existente.</h2>
        <Link to={"/"}>Voltar para home</Link>
      </div>
    );
  }

  const updatedUser = {
    ...user,
    messages: [...(user.message || []), newMessage],
  };

  return (
    <div>
      <Link to={"/usuarios"}>Voltar para lista de usuários</Link>
      <div>
        <h3>{user.name}</h3>
        <p>email:{user.email}</p>
        <p>idade: {user.age}</p>
        <img src={user.image} alt="" />
      </div>
      <div>
        <h2>Chat</h2>
        <ul>
          {user.messages?.map((message) => (
            <li>{message.content}</li>
          ))}
        </ul>
        <form>
          <label>Digite sua mensagem</label>
          <input></input>
        </form>
      </div>
    </div>
  );
}
