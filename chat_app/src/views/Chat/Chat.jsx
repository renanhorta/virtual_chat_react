import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import styles from "./Chat.module.css";

export default function Chat() {
  const params = useParams();
  const userID = params.userId;
  const { getProfile, updateProfile } = useLocalStorage("Profiles");
  const [user, setUser] = useState(null);
  const [messageContent, setMessageContent] = useState("");

  useEffect(() => {
    const fetchedUser = getProfile(userID);
    setUser(fetchedUser);
  }, [userID]);

  if (!user) {
    return (
      <div style={styles.container}>
        <h2>Perfil não existente.</h2>
        <Link to={"/"}>Voltar para home</Link>
      </div>
    );
  }

  const handleSendMessage = (event) => {
    event.preventDefault();

    // new object msg to be added in the user profile.
    const newMessage = {
      date: new Date().toISOString(),
      content: messageContent,
    };

    // adding the new msg in the messages props of the object
    const updatedUser = {
      ...user,
      messages: [...(user.messages || []), newMessage],
    };
    updateProfile(userID, updatedUser);
    setUser(updatedUser);
    setMessageContent("");
  };

  return (
    <div style={styles.container}>
      <div style={styles.profile}>
        <h3>{user.name}</h3>
        <p>email:{user.email}</p>
        <p>idade: {user.age}</p>
        <img src={user.image} alt="" />
      </div>
      <div style={styles.chat}>
        <h2>Chat</h2>
        <ul style={styles.messageList}>
          {user.messages?.map((message, index) => (
            <li key={index}>
              <strong>{new Date(message.date).toLocaleString()}:</strong>{" "}
              {message.content}
            </li>
          ))}
        </ul>
        <form onSubmit={handleSendMessage}>
          <label>Digite sua mensagem</label>
          <input
            type="text"
            value={messageContent}
            onChange={(e) => setMessageContent(e.target.value)}
            style={styles.input}
            required
          />
          <button type="submit" style={styles.button}>
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}
