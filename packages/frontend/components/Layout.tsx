import React from "react";
import Navbar from "./Navbar";


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="flex flex-col items-center justify-center w-full p-2 max-w-[1100px] mx-auto">{children}</main>
    </>
  )
}