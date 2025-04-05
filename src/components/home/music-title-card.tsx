import './home.css';
import {PlayIcon} from "@heroicons/react/24/solid";
import {Track} from "@spotify/web-api-ts-sdk";

interface IMusicTitleCardProps {
    track: Track;
}

export const MusicTitleCard = ({track}: IMusicTitleCardProps) => {
    const sdk = globalThis.sdk;

    async function playSong() {
        //await sdk.player.addItemToPlaybackQueue(track.uri);
        //await sdk.player.skipToNext();
    }

    return (<div className='music-title-card border-2 border-green-500 rounded-md' onClick={playSong}>
        <div className='flex items-center float-left mr-1'>
            <button className='bg-transparent border-none'><PlayIcon height={16} width={16}
                                                                     className='fill-sky-600'/></button>
        </div>
        {track.name} </div>);
}