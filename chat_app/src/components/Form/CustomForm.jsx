import React, { useState } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";

function Submit({ isPending }) {
  return (
    <button type="submit" disabled={isPending}>
      {isPending ? "Cadastrando..." : "Cadastrar"}
    </button>
  );
}

export default function CustomUserForm() {
  /** component responsible for registering new profiles in the application's localstorage. */
  const [isPending, setIsPending] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);
  const [photoUrl, setPhotoUrl] = useState("");
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState(""); // Show a message when the profile is saved

  // use the custom hook to manage profiles in localStorage
  const { setItem } = useLocalStorage("Profiles");

  const validateName = (name) => {
    // This regex checks that the name contains only letters (including accented characters, like é/ç/ã and others) and spaces.
    if (!/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/.test(name)) {
      return "O nome deve conter apenas letras.";
    }
    if (name.length < 3) {
      return "O nome deve ter pelo menos 3 letras.";
    }
    return null;
  };

  const validateEmail = (email) => {
    // Regex to check if the email is in a valid format, containing a user, an “@” and a domain.
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Insira um email válido.";
    }
    return null;
  };

  const validateAge = (age) => {
    // The age must be greater than 0
    if (age <= 0) {
      return "A idade deve ser maior que zero.";
    }
    return null;
  };

  const handleSubmit = async (event) => {
    /**
     * This function controls the submission of the form.
     * First, the function prevents the standard submit event from working, after which it makes a switch in the “isPending”
     * state to simulate sending information to a back-end and takes all the values from the form inputs and validates each one
     * independently.
     * If they are all validated, the form saves the form values in a “profile” object in localStorage in the “Profiles” field.
     */
    event.preventDefault();
    setIsPending(true);

    // Validate inputs fields and capture error messages
    const nameError = validateName(name);
    const emailError = validateEmail(email);
    const ageError = validateAge(Number(age));

    if (nameError || emailError || ageError) {
      // If any error exists, update the errors object and stop the submission process
      setErrors({
        name: nameError,
        email: emailError,
        age: ageError,
      });
      setIsPending(false);
      return;
    }

    // If no errors, clear the errors object
    setErrors({});

    // Create a new profile object to be saved in the localStorage
    const newProfile = {
      id: new Date().getTime(),
      name: name,
      image: photoUrl,
      email: email,
      age: age,
      messages: [],
    };

    setItem(newProfile); // Save the new profile in the localStorag

    // Simulate a back-end communication delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsPending(false);

    // Show success message
    setSuccessMessage("Perfil cadastrado!");
    setTimeout(() => setSuccessMessage(""), 2000);

    // Clear the form fields
    setName("");
    setEmail("");
    setAge(0);
    setPhotoUrl("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">
        Nome*
        <input
          type="text"
          name="name"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
        />
        {/* Checks if the errors string is not empty, and renders a red error message below the field */}
        {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
      </label>

      <label htmlFor="email">
        Email
        <input
          type="email"
          name="email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
      </label>

      <label htmlFor="age">
        Idade
        <input
          type="number"
          name="age"
          value={age}
          required
          min={0}
          max={120}
          onChange={(e) => setAge(e.target.value)}
        />
        {errors.age && <p style={{ color: "red" }}>{errors.age}</p>}
      </label>

      <label htmlFor="photoUrl">
        Foto
        <input
          type="url"
          name="photoUrl"
          value={photoUrl}
          onChange={(e) => setPhotoUrl(e.target.value)}
        />
      </label>

      <Submit isPending={isPending} />
      {/* Show success message */}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
    </form>
  );
}
