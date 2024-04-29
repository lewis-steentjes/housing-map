"use client";

import React from "react";
import FilterOptions from "./searchOptions/FilterOptions";
import CloseButton from "./CloseButton";
import LogIn from "./LogIn";
import ApiQueryButton from "./devTools/ApiQueryButton";

interface Props {
  setIsHidden: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Sidebar(props: Props) {
  return (
    <div className="flex flex-col container fixed top-0 left-0 w-96 px-4 pt-4 pb-0 bg-slate-600/40 backdrop-blur-md h-full rounded-r-xl text-zinc-100 ">
      <div className="flex flex-row justify-end content-center items-center">
        <CloseButton setIsHidden={props.setIsHidden} />
      </div>
      <FilterOptions />

      <ApiQueryButton />
      <div className="grow"></div>
      <div className="">
        <LogIn />
      </div>
    </div>
  );
}
