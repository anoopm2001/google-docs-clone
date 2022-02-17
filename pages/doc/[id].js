import React from "react";
import { getSession, useSession } from "next-auth/client";
import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import { useRouter } from "next/router";
import { useCollectionOnce } from "react-firebase-hooks/firestore";
import Login from "../../components/Login";
// import { db } from "firebase";
import { db } from "../../firebase.js";
import TextEditor from "../../components/TextEditor";
function Doc() {
  const [session] = useSession();
  if (!session) return <Login />;
  const router = useRouter();
  const { id } = router.query;
  const [snapshot, loadingSnapshot] = useCollectionOnce(
    db
      .collection("userDocs")
      .doc(session?.user?.email)
      .collection("docs")
      .doc(id)
  );
  if (!loadingSnapshot && !snapshot?.data()?.fileName) router.replace("/");
  return (
    <div>
      <header className="flex justify-between items-center p-3 pb-1">
        <span className="cursor-pointer" onClick={() => router.push("/")}>
          <Icon name="description" size="5xl" color="blue" />
        </span>
        <div className="flex-grow px-2">
          <h2>{snapshot?.data()?.fileName}</h2>
          <div className="flex items-center text-sm space-x-1 -ml-1 h-8 text-zinc-600">
            <p className="cursor-pointer hover:bg-gray-100 transition duration-200 ease-out p-2 rounded-lg">
              File
            </p>
            <p className="cursor-pointer hover:bg-gray-100 transition duration-200 ease-out p-2 rounded-lg">
              Edit
            </p>
            <p className="cursor-pointer hover:bg-gray-100 transition duration-200 ease-out p-2 rounded-lg">
              View
            </p>
            <p className="cursor-pointer hover:bg-gray-100 transition duration-200 ease-out p-2 rounded-lg">
              Insert
            </p>
            <p className="cursor-pointer hover:bg-gray-100 transition duration-200 ease-out p-2 rounded-lg">
              Format
            </p>
            <p className="cursor-pointer hover:bg-gray-100 transition duration-200 ease-out p-2 rounded-lg">
              Tools
            </p>
          </div>
        </div>
        <Button
          color="blue"
          buttonType="filled"
          rounded={false}
          size="regular"
          iconOnly={false}
          ripples="dark"
          block={false}
          className="h-10 hidden md:inline-flex  !border-0"
        >
          <Icon name="people" size="md" />
          Share
        </Button>
        <img
          src={session?.user?.image}
          className="cursor-pointer h-10 w-10 rounded-full ml-2 md:h-12 md:w-12"
        />
      </header>
      <TextEditor />
    </div>
  );
}
export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: {
      session,
    },
  };
}
export default Doc;
