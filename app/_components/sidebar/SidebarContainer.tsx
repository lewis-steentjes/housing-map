"use client";
import { useState } from "react";
import OpenButton from "./OpenButton";
import Sidebar from "./Sidebar";
import { SearchSettings } from "@/app/_types/Search";

export default function SidebarContainer() {
  const [isHidden, setIsHidden] = useState(false);
  // const setIsHidden = () => true
  // const isHidden = true
  if (isHidden) {
    return (
      <>
        <OpenButton setIsHidden={setIsHidden} />
      </>
    );
  } else {
    return (
      <>
        <Sidebar setIsHidden={setIsHidden} />
      </>
    );
  }
}
