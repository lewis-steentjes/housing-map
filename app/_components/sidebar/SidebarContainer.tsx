"use client";
import { useState } from "react";
import OpenButton from "./OpenButton";
import Sidebar from "./Sidebar";

export default function SidebarContainer() {
  const [isHidden, setIsHidden] = useState(true);

  if (isHidden) {
    return (
      <div className="z-10">
        <OpenButton setIsHidden={setIsHidden} />
      </div>
    );
  } else {
    return (
      <div className="z-10">
        <Sidebar setIsHidden={setIsHidden} />
      </div>
    );
  }
}
