import React from "react";
import Image from "next/image"

export default function Logo(): React.ReactElement {
    return (
        <div className="flex items-center gap-4">
            <Image src={'../public/images/logo.svg'} alt="logo" width={50} height={50} />
            <h1 className="text-green300">NatureLink</h1>
        </div>
    )
}