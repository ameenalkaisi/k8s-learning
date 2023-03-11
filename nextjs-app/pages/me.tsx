import { signIn, signOut, useSession } from "next-auth/react";
import styles from "@/styles/Me.module.css";
import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Me() {
  const { data: session } = useSession();
  const [name, setName] = useState("");
  const router = useRouter();

  const onSubmit = async () => {
    if (session) {
      await axios
        .put("/api/users", {
          ...session.user,
          name: name,
        });
        await axios.get("/api/auth/session?update");

      router.reload();
    }
  };

  return (
    <div className={styles.me}>
      {(session && (
        <>
          {/* update info here */}
          Signed in as {session.user.name ?? "null"} <br />
          <label>Enter name</label>
          <input
            type="text"
            value={name}
            onChange={(text) => setName(text.target.value)}
          />
          <button onClick={onSubmit}>Submit</button>
          <button onClick={() => signOut()}>Sign out</button>
        </>
      )) || (
        <>
          Not signed in <br />
          <button onClick={() => signIn()}>Sign in</button>
        </>
      )}

      <Link href="/">Go back</Link>
    </div>
  );
}
