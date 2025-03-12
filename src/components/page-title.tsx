"use client";
import {usePathname} from "next/navigation";

export const PageTitle = () => {
    const pathname = usePathname();
    let title;
      switch (pathname) {
        case '/home': title = 'Home'; break;
        case '/my-collection': title = 'Music Collection'; break;
        case '/search': title = 'Search'; break;
        default: title = 'Music Streaming App';
    }

    return (<h2> {title} </h2>)
}