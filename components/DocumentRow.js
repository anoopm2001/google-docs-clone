import React from "react";
import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import { useRouter } from "next/dist/client/router";
function DocumentRow({ id, filename, date }) {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/doc/${id}`)}
      className="flex items-center p-4 rounded-lg hover:bg-gray-100 text-gray-600 max-w-3xl mx-auto text-sm cursor-pointer  "
    >
      <Icon name="article" size="3xl" color="blue" />
      <p className="flex-grow pl-5 w-10 pr-10 md:truncate">{filename}</p>
      <p className="pr-5 text-sm sm:hidden  ">
        {date?.toDate().toDateString()}
      </p>
      <p className="pr-5 text-sm hidden md:inline-flex">
        {date?.toDate().toLocaleString()}
      </p>
      <Button
        color="gray"
        buttonType="outline"
        rounded={true}
        iconOnly={true}
        ripples="dark"
        className=" !border-0"
      >
        <Icon name="more_vert " size="2xl" />
      </Button>
    </div>
  );
}

export default DocumentRow;
