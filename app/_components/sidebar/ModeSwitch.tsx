import { ModeContext } from "@/app/_utils/contexts/ModeContext";
import { useContext } from "react";

export default function ModeSwitch() {
  const { currentMode, setCurrentMode } = useContext(ModeContext);
  const handleToggle = () => {
    if (currentMode == "Rent") setCurrentMode("Purchase");
    if (currentMode == "Purchase") setCurrentMode("Rent");
  };
  const isChecked = currentMode == "Purchase" ? true : false;
  return (
    <>
      <h1 className="text-3xl font-bold ml-2"> {currentMode} </h1>
      <input type="checkbox" className="toggle toggle-warning" onChange={handleToggle} checked={isChecked} />
    </>
  );
}
