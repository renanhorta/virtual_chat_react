import { useEffect, useState } from "react";
import UserForm from "../UserForm/UserForm";
import UsersList from "../UsersList/UsersList";
import { useLocalStorage } from "../../hooks/useLocalStorage";

const FAKEDATA = [
  {
    id: 1,
    name: "renan",
    email: "email@email.com",
    age: 18,
    photoUrl: "",
    messages: [
      {
        date: "15-12-2024:12:25:30",
        message: "olá",
      },
      {
        date: "15-12-2024:12:25:40",
        message: "Tudo bem?",
      },
    ],
  },
  {
    id: 2,
    name: "carla",
    email: "carla@email.com",
    age: 19,
    photoUrl: "",
    messages: [
      {
        date: "15-12-2024:12:25:31",
        message: "olá",
      },
      {
        date: "15-12-2024:12:25:45",
        message: "To bem e você?",
      },
    ],
  },
];

const FAKEEMPTYDATA = [];

export default function Home() {
  const [profiles, setProfiles] = useState([]);
  const { getItem } = useLocalStorage("Profiles");

  useEffect(() => {
    // get the value in the localStorage with the "Profiles" key
    const storedProfiles = getItem();
    if (storedProfiles) {
      setProfiles(storedProfiles);
    }
  }, [getItem]);

  return (
    <>{!profiles || profiles.length == 0 ? <UserForm /> : <UsersList />}</>
  );
}
