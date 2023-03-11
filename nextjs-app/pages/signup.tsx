import axios, { AxiosError } from "axios";
import Link from "next/link";
import React, { useState } from "react";

const SignUp = () => {
  const [email, setEmail] = useState<string>("");
  const [pw, setPw] = useState<string>("");
  const [helpText, setHelpText] = useState<string>("");

  const submitInfo = async () => {
    axios
      .post("/api/users", {
        email: email,
        password: pw,
      })
      .then(() => {
        setEmail("");
        setPw("");
        setHelpText("success");
      })
      .catch((err: AxiosError) => {
        setHelpText("failure");
        console.log(err.toJSON())
      });
  };

  return (
    <>
      <div>
        <br />
        <label>Enter e-mail</label>
        <input
          type="email"
          onChange={(text) => setEmail(text.target.value)}
          value={email}
        />
        <label>Enter Password</label>
        <input
          type="password"
          onChange={(text) => setPw(text.target.value)}
          value={pw}
        />
        <button onClick={submitInfo}>Submit</button>
        <p>{helpText}</p>
      </div>

      <Link href="/">Go back</Link>
    </>
  );
};

export default SignUp;
