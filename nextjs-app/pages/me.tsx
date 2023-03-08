import { signIn, signOut, useSession } from "next-auth/react";

export default function Me() {
  const { data } = useSession();

  if (data) {
    return (
      <>
        Signed in as {JSON.stringify(data)} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}
