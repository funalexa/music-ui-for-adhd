import {HomeIcon, MagnifyingGlassIcon, MusicalNoteIcon} from "@heroicons/react/24/outline";
import Link from "next/link";

export const MenuFooter = () => {
    return (<nav>
        <ul className="row-start-3 flex gap-16 flex-wrap items-center justify-center">
            <li className="flex items-center gap-3 hover:underline hover:underline-offset-4"
            >
                <Link href="/home">
                    <HomeIcon color={'white'} width={48}
                              height={48}
                    />
                </Link>
            </li>
            <li className="flex items-center gap-3 hover:underline hover:underline-offset-4"
            >
                <Link href="/my-collection">
                    <MusicalNoteIcon color={'white'} width={48}
                                     height={48}
                    />
                </Link>
            </li>
            <li className="flex items-center gap-3 hover:underline hover:underline-offset-4"
            >
                <Link href="/search">
                    <MagnifyingGlassIcon color={'white'} width={48}
                                         height={48}
                    />
                </Link>
            </li>
        </ul>
    </nav>);
}
