import type { NextPage } from "next";
import { useAddress } from "@thirdweb-dev/react";
import React from "react";

const Home: NextPage = () => {
  const address = useAddress();

  return (
    <h1></h1>
  );
};

export default Home;
