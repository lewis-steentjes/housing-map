"use client";

import React, { useContext } from "react";
import FilterOptions from "./searchOptions/FilterOptions";
import CloseButton from "./CloseButton";
import LogIn from "./LogIn";
import { FilterContext } from "@/app/_utils/contexts/FilterContext";
import RentalOptions from "./searchOptions/RentalOptions";
import AuctionOptions from "./searchOptions/AuctionOptions";

interface Props {
  setIsHidden: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Sidebar(props: Props) {
  const { currentMode, setCurrentMode } = useContext(FilterContext);

  return (
    <div className="flex flex-col container fixed top-0 left-0 w-96 px-4 pt-4 pb-0 bg-slate-600/40 backdrop-blur-md h-full rounded-r-xl text-zinc-100 ">
      <div className="flex flex-row justify-between  content-center items-center">
        <h1 className="text-3xl font-bold underline ml-2">Filters: {currentMode} </h1>
        <CloseButton setIsHidden={props.setIsHidden} />
      </div>
      {currentMode == "Rental" ? <RentalOptions /> : <AuctionOptions />}
      <div className="grow"></div>
      <div className="">
        <p>
          Log in to save your previous map location, filter settings and track viewed listings. <br />
          <span className="italic text-red-700">Not yet implemented</span>
        </p>
        <LogIn />
      </div>
    </div>
  );
}
