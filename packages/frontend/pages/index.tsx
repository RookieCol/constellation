import type { NextPage } from "next";
import { useAddress } from "@thirdweb-dev/react";
import React from "react";
import Feed from "../components/Feed";

const Home: NextPage = () => {
  const address = useAddress();

  return (
    <main className="flex flex-col items-center justify-center p-10">
      <Feed />
    </main>
  );
};

export default Home;
