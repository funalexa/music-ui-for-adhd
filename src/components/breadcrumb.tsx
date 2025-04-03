import {useHistory} from "@/contexts/History";
import {ChevronLeftIcon} from "@heroicons/react/24/solid";
import Link from "next/link";
import "./breadcrumb.css";

export const Breadcrumb = () => {
    const {history} = useHistory();
    console.log(history);

    const previousPagePath = history[history.length - 2];
    let previousPageName;
    switch (previousPagePath) {
        case '/home':
            previousPageName = 'Home';
            break;
        case '/my-collection':
            previousPageName = 'My Collection';
            break;
        case '/search':
            previousPageName = 'Search';
            break;
    }

    return <div className="w-full"><Link href={previousPagePath} className='flex'>
        <div className='aligned-icon'><ChevronLeftIcon height={16}/></div> {previousPageName} </Link></div>;
}