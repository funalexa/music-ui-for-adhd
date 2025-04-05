import "./track-entry.css";
import "./library-track-entry.css";
import {Track} from "@spotify/web-api-ts-sdk";
import Image from "next/image";

interface ITrackEntryProps {
    track: Track;
}

const fallbackImage = 'https://cdn.pixabay.com/photo/2017/01/09/20/11/music-1967480_1280.png';

export const LibraryTrackEntry = ({track}: ITrackEntryProps) => {
    function millisToMinutesAndSeconds(millis: number) {
        const minutes = Math.floor(millis / 60000);
        const seconds = ((millis % 60000) / 1000);
        if (seconds < 10) console.log(seconds)
        return minutes + ":" + (seconds < 9.5 ? '0' : '') + seconds.toFixed(0);
    }

    return (
        <li className='mb-4 search-history-item border-b-gray-200 border-b-2 pb-4 flex items-center' key={track.id}>
            <div className='album-image'><Image src={track.album?.images?.[0]?.url || fallbackImage}
                                                alt={track.album?.name || 'Image of Album'} width={48} height={48}/>
            </div>
            <div className='ml-2 pr-4 pl-1 flex w-full'>
                <div className="track-name"><strong>{track.name} </strong>
                    <br/> {track.artists.map(artist => artist.name).join(', ')}</div>
                <div className="float-right track-duration flex items-center"><span
                    className="text-gray-600"> {millisToMinutesAndSeconds(track.duration_ms)} </span></div>
            </div>
        </li>);
}