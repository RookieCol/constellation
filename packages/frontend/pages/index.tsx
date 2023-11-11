import { ConnectWallet } from "@thirdweb-dev/react";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <main className="flex flex-col items-center justify-center p-10">
      <div className="">
        <ConnectWallet
          theme={"dark"}
          modalSize={"compact"}
          btnTitle={"Connect Wallet"}
          modalTitleIconUrl={""}
        />
      </div>
    </main>
  );
};

export default Home;