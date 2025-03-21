import './home.css'
import Link from "next/link";

interface IContentCardProps {
    text: string;
    large?: boolean;
    link?: string;
}

export const ContentCard = ({text, large, link}: IContentCardProps) => {
    let className = 'content-card border-2 border-gray-200';
    if (large) className = className.concat(' col-span-full');
    if (link) {
        return <Link href={link} className={className}> {text} </Link>
    } else return <div className={className}> {text} </div>;
}