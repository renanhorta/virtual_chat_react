import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useChatLocalStorage } from "../../hooks/useChatLocalStorage";
import styles from "./Chat.module.css";

export default function Chat() {
  /**this component renders the selected user fields, the messages in the localStorage chat and the registered profiles,
   *  at the end there is a form that serves to send a message to the localStorage chat. */
  const params = useParams();
  const userID = params.userId;
  const { getProfile, updateProfile } = useLocalStorage("Profiles");
  const { addMessage, getMessages } = useChatLocalStorage("chatMessages");
  const [user, setUser] = useState(null);
  const [allProfiles, setAllProfiles] = useState([]);
  const [messages, setMessages] = useState([]);
  const [messageContent, setMessageContent] = useState("");

  useEffect(() => {
    //It loads all the data from the selected profile and selects all the profiles that are stored in the localStorage.
    // The Hook is called every time the userID changes, every time the url “users:/userID” changes.
    const selectedUser = getProfile(userID);
    const profiles = JSON.parse(localStorage.getItem("Profiles")) || [];
    setUser(selectedUser);
    setAllProfiles(profiles.filter((profile) => profile.id !== userID));

    // load the chat with all the messages in the localStorage.
    setMessages(getMessages());
  }, [userID, getMessages]);

  if (!user) {
    return (
      <div className={styles.container}>
        <h2>Perfil não existente.</h2>
        <Link to={"/"}>Voltar para home</Link>
      </div>
    );
  }

  const handleSendMessage = (event) => {
    event.preventDefault();
    // Check if the messageContent is valid to save in the localStorage
    if (
      !messageContent ||
      !messageContent.trim() ||
      messageContent.length === 0
    ) {
      console.log("não pode enviar menssagem vazia");
      return;
    }

    // new object msg to be added in the user profile.
    const newMessage = {
      author: user.name,
      content: messageContent,
    };

    // adding the new msg in the messages props of the object
    addMessage(newMessage);
    setMessages((prev) => [
      ...prev,
      { ...newMessage, time: new Date().toISOString() },
    ]);
    setMessageContent("");
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftPanel}>
        <Link to={"/usuarios"}>Lista de usuários</Link>
        {user.image ? (
          <img
            src={user.image}
            alt={user.name}
            className={styles.profileImage}
          />
        ) : (
          <p className={styles.noProfileImage}>{user.name[0]}</p>
        )}
        <h3>{user.name}</h3>
        <p>Email: {user.email}</p>
        <p>Idade: {user.age}</p>
      </div>

      <div className={styles.chat}>
        <h2 className={styles.title}>Chat</h2>
        <ul className={styles.messageList}>
          {messages.map((message, index) => (
            <li key={index} className={styles.messageBox}>
              <strong>
                [{new Date(message.time).toLocaleString()}] {message.author}:
              </strong>
              {message.content}
            </li>
          ))}
        </ul>
        <form onSubmit={handleSendMessage} className={styles.form}>
          <label>Digite sua mensagem</label>
          <input
            type="text"
            value={messageContent}
            onChange={(e) => setMessageContent(e.target.value)}
            className={styles.input}
            required
          />
          <button type="submit" className={styles.button}>
            Enviar
          </button>
        </form>
      </div>

      <div className={styles.rightPanel}>
        <h3>Usuários Disponíveis</h3>
        {allProfiles.map((profile) => (
          <div key={profile.id} className={styles.userCard}>
            {profile.image ? (
              <img
                src={profile.image}
                alt={profile.name}
                className={styles.userImage}
              />
            ) : (
              <p className={styles.noImageUser}>{profile.name[0]}</p>
            )}
            <p>{profile.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
