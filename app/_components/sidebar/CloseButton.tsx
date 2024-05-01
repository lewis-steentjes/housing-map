import React from "react";

interface Props {
  setIsHidden: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CloseButton(props: Props) {
  const setAsHidden = () => {
    props.setIsHidden(true);
  };

  return (
    <>
      <button
        onClick={setAsHidden}
        className="pt-2 pb-3 px-3 rounded-md text-2xl drop-shadow-lg hover:px-4 duration-100 bg-accent text-accent-content"
      >
        ←
      </button>
    </>
  );
}
