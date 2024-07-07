
import Encyclopedia from "./encyclopedia/page";
import LandingPage from "./landing/page";

export default function Home() {

  return (
    <main className="flex flex-col w-[screen] overflow-x-hidden bg-black items-center">
      <LandingPage />
      <Encyclopedia />
    </main>
  );
}
