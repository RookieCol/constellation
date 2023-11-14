import { ConnectWallet } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import Feed from "../components/Feed";

const Home: NextPage = () => {
  return (
    <main className="flex flex-col items-center justify-center p-10">
      <Feed />
    </main>
  );
};

export default Home;