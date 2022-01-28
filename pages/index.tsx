import Head from 'next/head'
import Header from '../components/Header'
import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import Modal from "@material-tailwind/react/Modal";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalFooter from "@material-tailwind/react/ModalFooter";
import Image from 'next/image';
import Login from "../components/Login"
import { useSession, getSession, session } from "next-auth/client"
import { useState } from 'react';
import firebase from "firebase"
import {db} from "../firebase"
import {useCollectionOnce} from "react-firebase-hooks/firestore"
import DocumentRow from "../components/DocumentRow"
import { useRouter } from 'next/router';

export default function Home() {

  const [session]=useSession();
   const[showModal,setShowModal]=useState(false)
    const router = useRouter();
  const [input, setInput] = useState("")
  const [snapshot] = useCollectionOnce(
    db.collection("userDocs")
      .doc(session?.user?.email!)
      .collection("docs")
    .orderBy("timestamp","desc")
 )

   if (!session)
     return <Login />
  const createDocument = () => {
    if (!input) return;
    db.collection("userDocs")
      .doc(session?.user?.email!)
      .collection("docs")
      .add({
        fileName: input,
        timestamp:firebase.firestore.FieldValue.serverTimestamp()
      })
    
    setInput("");
    setShowModal(false);
    router.reload();
    
   };
  const modal = (<Modal size="sm" active={showModal} toggler={() => setShowModal(false)}>
     
    <ModalBody>
      <input value={input} onChange={(e) => setInput(e.target.value) } type="text" className="outline-none w-full" placeholder="Enter name of document"
      onKeyDown={(e) => e.key==="Enter" && createDocument()}         />
    </ModalBody>
    <ModalFooter>
      <Button
        color="blue"
        buttonType="link"
        onClick={(e) => setShowModal(false)}
        ripple="dark"
       
      >
        Cancel
      </Button>
      <Button color="blue" onClick={createDocument} ripple="light" >Create</Button>
    </ModalFooter>







  </Modal>);
  

  





  return (
    <div className="">
      <Head>
        <title>Google Docs Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      {modal}
      
      <section className="bg-[#F8F9FA] pb-10 px-10">
        <div className="max-w-3xl mx-auto">
          <div className="py-6 flex items-center justify-between">
            <h2 className="text-gray-700 text-lg">Start a new Document</h2>
            <Button
        color="gray"
        buttonType="outline"
        rounded={true}
        iconOnly={true}
        ripples="dark"
        className=" !border-0"
      >
        <Icon name="more_vert " size="3xl" />
      </Button>
          </div>
          <div onClick={()=>setShowModal(true)} className="relative h-52 w-40 border-2 cursor-pointer hover:border-blue-400">
            <Image src="https://links.papareact.com/pju" layout="fill"/>
          </div>
          <p className="text-gray-600 font-semibold ml-2 mt-2">Blank</p>
        </div>
      </section>
      <section className="bg-white px-10 md:px-0">
        <div className="max-w-3xl mx-auto py-8 text-gray-600 text-sm">
          <div className="flex items-center justify-between pb-5">
            <h2 className="font-medium flex-grow">My Documents</h2>
            <p className="mr-12">Date created</p>
            <Icon name="folder" color="gray" size="3xl"/>
          </div>
        </div>
        {snapshot?.docs.map(doc => (<DocumentRow
          key={doc.id}
          id={doc.id}
          filename={doc.data().fileName}
          date={ doc.data().timestamp} />))}
      </section>
    </div>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: {
      session,
    }
  }
}