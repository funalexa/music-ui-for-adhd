import './home.css';
import {PlayIcon} from "@heroicons/react/24/solid";
import {Track} from "@spotify/web-api-ts-sdk";
import {useWebPlayer} from "@/contexts/SpotifyWebPlayer";
import {JSX, useRef} from "react";

interface IMusicTitleCardProps {
    track: Track;
}

export const MusicTitleCard = ({track}: IMusicTitleCardProps) => {
    const {startTrack} = useWebPlayer();
    const ref = useRef(null)


    async function playSong() {
        await startTrack(undefined, [track.uri]);
    }

    const songTitleElement: JSX.Element = <div id='overflow' ref={ref}>{track.name}</div>;

    function isElementOverflowing(): boolean {
        return 132 < ref?.current?.scrollWidth
    }

    return (<div className='music-title-card border-2 border-green-500 rounded-md h-7 overflow-clip' onClick={playSong}>
        <div className='flex items-center float-left mr-1'>
            <button className='bg-transparent border-none'><PlayIcon height={16} width={16}
                                                                     className='fill-sky-600'/></button>
        </div>
        {(isElementOverflowing() && (
            <marquee scrollmount={6}> {track.name} </marquee>))} {!isElementOverflowing() && songTitleElement} </div>);
}