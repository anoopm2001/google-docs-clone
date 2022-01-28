import React from "react";
import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import { signOut, useSession } from "next-auth/client";
function Header() {
  const [session] = useSession();
  return (
    <header className="flex items-center sticky top-0 z-50 shadow-md bg-white px-4 py-2">
      <Button
        color="gray"
        buttonType="outline"
        rounded={true}
        iconOnly={true}
        ripples="dark"
        className="h-20 w-20   !border-0"
      >
        <Icon name="menu" size="3xl" />
      </Button>
      <Icon name="description" size="3xl" color="blue" />
      <h1 className="ml-2 text-gray-700 text-2xl ">Docs Clone</h1>
      <div className=" sm:mx-5 md:mx-20  flex-grow flex items-center px-5 py-2 focus-within:text-zinc-600 focus-within:shadow-md bg-gray-100 text-gray-600 rounded-lg">
        <Icon name="search" size="3xl" color="gray" />
        <input
          type="text"
          placeholder="Search"
          className="px-5 flex-grow text-base bg-transparent outline-none"
        ></input>
      </div>
      <Button
        color="gray"
        buttonType="outline"
        rounded={true}
        iconOnly={true}
        ripples="dark"
        className="h-20 w-20 !border-0"
      >
        <Icon name="apps" size="3xl" />
      </Button>

      <img
        src={session?.user?.image}
        className="cursor-pointer h-12 w-12 rounded-full ml-2"
        onClick={signOut}
      />
    </header>
  );
}

export default Header;