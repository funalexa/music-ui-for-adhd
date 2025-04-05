import './home.css'
import Link from "next/link";
import Image from "next/image";
import {ReactElement} from "react";

interface IContentCardProps {
    text: string;
    large?: boolean;
    link: string;
    image?: string;
    icon?: ReactElement;
}

export const ContentCard = ({text, large, link, image, icon}: IContentCardProps) => {
    let className = 'content-card border-2 border-green-500 rounded-md';
    if (large) className = className.concat(' col-span-full');

    if (image) {
        return <Link href={link}>
            <div className="flex flex-col justify-center items-center">
                <Image src={image}
                       alt={'Image of Album'}
                       width={132} height={132}/>
                <h5 className='mt-1'> {text} </h5>
            </div>
        </Link>
    }
    return <Link href={link} className={className}>
        {icon ?? icon}<h5> {text} </h5>
    </Link>;
}