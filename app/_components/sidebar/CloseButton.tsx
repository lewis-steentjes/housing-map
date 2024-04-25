import React from "react";

interface Props {
  setIsHidden: React.Dispatch<React.SetStateAction<boolean>>
}

export default function CloseButton(props: Props) {
  const setAsHidden = () => {
    props.setIsHidden(true);
  }

  return (
    <>
      <button onClick={setAsHidden} className="btn">&lt;</button>
    </>
  )
}