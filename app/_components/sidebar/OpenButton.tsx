import React from "react";

interface Props {
  setIsHidden: React.Dispatch<React.SetStateAction<boolean>>
}

export default function OpenButton(props: Props) {
  const setAsHidden = () => {
    props.setIsHidden(false);
  }

  return (
    <div className="fixed top-0 left-0 px-4 py-4">
      <button onClick={setAsHidden} className="btn">&gt;</button>
    </div>
  )
}