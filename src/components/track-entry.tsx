import "./track-entry.css";
import {PlayIcon, PlusIcon} from "@heroicons/react/24/solid";
import {SimplifiedTrack, Track} from "@spotify/web-api-ts-sdk";
import colors from "tailwindcss/colors";
import {useWebPlayer} from "@/contexts/SpotifyWebPlayer";

interface ITrackEntryProps {
    track: SimplifiedTrack | Track;
    isInPlayList?: boolean;
    includedInOwnLibrary?: boolean;
    addTrack?: () => Promise<void>;
}

export const TrackEntry = ({track, isInPlayList, includedInOwnLibrary, addTrack}: ITrackEntryProps) => {
    const {startTrack} = useWebPlayer();

    async function playSong() {
        console.log(track);
        await startTrack(undefined, [track.uri]);
    }

    function millisToMinutesAndSeconds(millis: number) {
        const minutes = Math.floor(millis / 60000);
        const seconds = ((millis % 60000) / 1000);
        return minutes + ":" + (seconds < 9.5 ? '0' : '') + seconds.toFixed(0);
    }

    return (
        <li className='track-entry-item bg-gray-100 border-gray-200 border-l-2 border-r-2 border-b-2 flex items-center'
            key={track.id}>
            <div className='flex items-center float-left mr-1' onClick={playSong}>
                <button className='bg-transparent border-none'><PlayIcon height={16} width={16}
                                                                         className='fill-sky-600'/></button>
            </div>
            <div className='pr-4 pl-1 flex w-full'>
                <div className="track-name" onClick={playSong}><strong>{track.name} </strong> {isInPlayList && (<>
                    <br/> {track.artists.map(artist => artist.name).join(', ')} </>)} </div>
                {!isInPlayList && (<div className="flex items-center float-right track-duration"><span
                    className="text-gray-600"> {millisToMinutesAndSeconds(track.duration_ms)} </span></div>)}
                {isInPlayList && (<div className="flex items-center float-right track-duration">
                    {includedInOwnLibrary ? (<span
                        className="text-gray-600"> {millisToMinutesAndSeconds(track.duration_ms)} </span>) : (<span
                        className="text-gray-600" onClick={addTrack ? async () => addTrack() : () => {
                    }}> <PlusIcon height={24} width={24} color={colors.green["600"]}/> </span>)} </div>)}
            </div>
        </li>);
}