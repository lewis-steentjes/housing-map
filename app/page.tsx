import Image from "next/image";
import SidebarContainer from "./_components/sidebar/SidebarContainer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>Hello 🧨🧨</p>
      <SidebarContainer />
    </main>
  );
}
