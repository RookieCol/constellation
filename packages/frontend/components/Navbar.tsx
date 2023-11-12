import { ConnectWallet } from "@thirdweb-dev/react";
import Logo from "./Logo";

export default function Component() {

    return (
    <div className=" flex flex-col items-center justify-start">
      <nav className="bg-gray-800 p-2 rounded-full w-9/12 m-2">
        <div className="flex items-center justify-around w-full">
          <Logo />
          <ul className="flex items-center space-x-2">
            <li>
              <a className="text-white" href="#">
                Home
              </a>
            </li>
            <li>
              <a className="text-white" href="#">
                About
              </a>
            </li>
            <li>
              <a className="text-white" href="#">
                Services
              </a>
            </li>
            <li>
              <a className="text-white" href="#">
                Contact
              </a>
            </li>
          </ul>
          <ConnectWallet
          theme={"dark"}
          modalSize={"compact"}
          btnTitle={"Connect Wallet"}
          modalTitleIconUrl={""}
        />
        </div>
      </nav>        
    </div>
  )
}

