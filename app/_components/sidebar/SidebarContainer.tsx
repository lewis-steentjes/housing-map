"use client";
import { useState } from "react";
import OpenButton from "./OpenButton";
import Sidebar from "./Sidebar";
import { Bounds } from "@/app/_types/Maps";
import { SearchSettings } from "@/app/_types/Search";

interface Props {
  bounds: Bounds;
}

export default function SidebarContainer(props: Props) {
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
        <Sidebar setIsHidden={setIsHidden} bounds={props.bounds} />
      </>
    );
  }
}
