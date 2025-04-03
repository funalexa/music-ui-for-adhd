"use client";
import {usePathname} from "next/navigation";
import {Breadcrumb} from "@/components/breadcrumb";

export const PageTitle = () => {
    const pathname = usePathname();
    let title;
    switch (pathname) {
        case '/home':
            title = 'Home';
            break;
        case '/my-collection':
            title = 'Music Collection';
            break;
        case '/search':
            title = 'Search';
            break;
        default:
            title = undefined;
    }

    return (title ? <header className="row-start-1 flex gap-6 flex-wrap items-center justify-center">
        <h2> {title} </h2></header> : <Breadcrumb/>)
}