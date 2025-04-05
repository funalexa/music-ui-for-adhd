import "./track-entry.css";
import {PlayIcon} from "@heroicons/react/24/solid";
import {SimplifiedTrack, Track} from "@spotify/web-api-ts-sdk";

interface ITrackEntryProps {
    track: SimplifiedTrack | Track;
    isInPlayList?: boolean;
}

export const TrackEntry = ({track, isInPlayList}: ITrackEntryProps) => {
    function millisToMinutesAndSeconds(millis: number) {
        const minutes = Math.floor(millis / 60000);
        const seconds = ((millis % 60000) / 1000);
        if (seconds < 10) console.log(seconds)
        return minutes + ":" + (seconds < 9.5 ? '0' : '') + seconds.toFixed(0);
    }

    return (
        <li className='track-entry-item bg-gray-100 border-gray-200 border-l-2 border-r-2 border-b-2 flex items-center' key={track.id}>
            <div className='flex items-center float-left mr-1'>
                <button className='bg-transparent border-none'><PlayIcon height={16} width={16}
                                                                         className='mt-2.5 fill-sky-600'/></button>
            </div>
            <div className='pr-4 pl-1 flex w-full'>
                <div className="track-name"><strong>{track.name} </strong> {isInPlayList && (<><br/> {track.artists.map(artist => artist.name).join(', ')} </>)} </div>
                <div className="float-right track-duration"><span
                    className="text-gray-600"> {millisToMinutesAndSeconds(track.duration_ms)} </span></div>
            </div>
        </li>);
}