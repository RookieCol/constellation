import Link from "next/link";
import { link, links } from "../utils/data";
import { useRouter } from "next/router";

function NavLink({ text, href }: link): React.ReactElement {
    const { asPath } = useRouter();

    const isActive = asPath === href;

    return (
        <Link className={`hover:text-green500 transition-all ${isActive && "opacity-40 pointer-events-none"
            }`} href={href}>
            <li>
                {text}
            </li>
        </Link>
    )
}

export function NavLinksResponsive(): React.ReactElement {
    return (
        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-gray-800 text-green400 rounded-box w-52">
            {links.map(item => (
                <NavLink key={item.text} text={item.text} href={item.href} />
            ))}
        </ul>
    )

}

export default function NavLinks(): React.ReactElement {
    return (
        <ul className="hidden lg:flex flex-row items-center gap-3 mx-7 grow font-bold text-green400">
            {links.map(item => (
                <NavLink key={item.text} text={item.text} href={item.href} />
            ))}
        </ul>
    )

}
