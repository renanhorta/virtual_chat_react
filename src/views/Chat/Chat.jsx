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
  const { getProfile, getProfileByName } = useLocalStorage("Profiles");
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

  useEffect(() => {
    /**
     * this hook takes handle changes to the localStorage in the “chatMessages” key. Each time chatMessages changes,
     *  setMessages is called, updating the messages in real time. The eventListiner is created so that all tabs hear the
     *  change in the LocalStorage, so that everyone updates their components and not just the person who sent the message.
     *  */
    const handleStorageChange = (event) => {
      if (event.key === "chatMessages") {
        setMessages(getMessages());
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [getMessages]);

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

  const formatMessageTime = (dateTime) => {
    /**
     * this function shows the “dateTime” depending on the day you are viewing the message.
     * if it is the same day, it will only show the hour and minutes, if it is not the same day it will show the full date
     * and time.
     */
    const messageDate = new Date(dateTime);
    const today = new Date();

    const isSameDay =
      messageDate.getDate() === today.getDate() &&
      messageDate.getMonth() === today.getMonth() &&
      messageDate.getFullYear() === today.getFullYear();

    const time = messageDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    if (isSameDay) {
      return time; // Show in the format HH:MM
    }

    const date = messageDate.toLocaleDateString([], {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    });

    return `${date} : ${time}`; // Show in the format DD/MM/AA : HH:MM
  };

  const getProfileByMessageAuthor = (author) => {
    const filteredProfile = getProfileByName(author);
    console.log(filteredProfile);
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftPanel}>
        <div className={styles.userPanel}>
          <Link to={"/usuarios"}>Lista de usuários</Link>
          <div className={styles.userInfo}>
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
          </div>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Idade:</strong> {user.age}
          </p>
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

      <div className={styles.chat}>
        <h2 className={styles.title}>Chat</h2>
        <ul className={styles.messageList}>
          {messages.map((message, index) => {
            // get the object profile of the message author
            const authorProfile = getProfileByName(message.author);
            const authorImage = authorProfile?.image; // get the Image of the message author
            const authorInitial = message.author[0]; // get the frist letter of the message

            return message.author === user.name ? (
              <li key={index} className={styles.userMessageBox}>
                <div className={styles.messageAuthor}>
                  {user.image ? (
                    <img src={user.image} alt={user.name} />
                  ) : (
                    <p>{user.name[0]}</p>
                  )}
                  <small>{formatMessageTime(message.time)}</small>
                </div>
                <div>{message.content}</div>
              </li>
            ) : (
              <li key={index} className={styles.messageBox}>
                <div className={styles.messageAuthor}>
                  {authorImage ? (
                    <img src={authorImage} alt={message.author} />
                  ) : (
                    <p>{authorInitial}</p>
                  )}
                  <small>
                    {formatMessageTime(message.time)} {message.author}:
                  </small>
                </div>
                <br />
                {message.content}
              </li>
            );
          })}
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
    </div>
  );
}
