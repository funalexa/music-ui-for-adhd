import {HomeIcon, MagnifyingGlassIcon, MusicalNoteIcon} from "@heroicons/react/24/outline";
import {
    HomeIcon as HomeIconSolid,
    MusicalNoteIcon as MusicalNoteIconSolid
} from "@heroicons/react/24/solid";

import Link from "next/link";
import {usePathname} from "next/navigation";

export const MenuFooter = () => {
    const pathname = usePathname();

    const isActive = (route: string) => {
        return pathname === route;
    }

    return (<nav>
        <ul className="row-start-3 flex gap-16 flex-wrap items-center justify-center">
            <li className="flex items-center gap-3 hover:underline hover:underline-offset-4"
            >
                <Link href="/home">
                    {isActive("/home") && (<HomeIconSolid color={'#171717'} width={48}
                                                          height={48}/>)}
                    {!isActive("/home") && (<HomeIcon color={'#171717'} width={48}
                                                      height={48}
                    />)}
                </Link>
            </li>
            <li className="flex items-center gap-3 hover:underline hover:underline-offset-4"
            >
                <Link href="/my-collection">

                    {isActive("/my-collection") ? (<MusicalNoteIconSolid color={'#171717'} width={48}
                                                                          height={48}/>) :  (<MusicalNoteIcon color={'#171717'} width={48}
                                                                                                       height={48}
                    />)}

                </Link>
            </li>
            <li className="flex items-center gap-3 hover:underline hover:underline-offset-4"
            >
                <Link href="/search">
                    {isActive("/search") && (<MagnifyingGlassIcon color={'#171717'} width={48}
                                                                       height={48} className='fill-black'
                    />)}
                    {!isActive("/search") && (<MagnifyingGlassIcon color={'#171717'} width={48}
                                                                   height={48}
                    />)}

                </Link>
            </li>
        </ul>
    </nav>);
}
