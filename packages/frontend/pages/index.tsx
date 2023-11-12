import type { NextPage } from "next";
import { useAddress } from "@thirdweb-dev/react";
import React from "react";

const Home: NextPage = () => {
  const address = useAddress()

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-10">
    </main>
  );
};

export default Home;