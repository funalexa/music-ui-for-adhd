import {SimplifiedTrack} from "@spotify/web-api-ts-sdk";
import './search-result.css';
import {PlayIcon, PlusIcon} from "@heroicons/react/24/solid";
import colors from "tailwindcss/colors";
import {useSavedTracks} from "@/contexts/SavedTracks";

interface ISearchResultProps {
    track: SimplifiedTrack;
}

export const SearchResult = ({track}: ISearchResultProps) => {
    const sdk = globalThis.sdk;

    const {savedTracks, addTrack} = useSavedTracks();

    function playSong() {
        // ToDo: initialize a player, probably somewhere else in the application, connect to it and play music
    }

    return (
        <li className='search-result-item bg-gray-100 border-gray-200 border-l-2 border-r-2 border-b-2' key={track.id}>
            <div className='play-button'>
                <button className='bg-transparent border-none'><PlayIcon height={16} width={16}
                                                                         className='mt-3 fill-sky-600'/></button>
            </div>
            <div className='pr-4 pl-1'>
                <strong>{track.name} </strong> {track.artists.map(artist => artist.name).join(', ')}
            </div>
            <div className="float-right track-duration">
                {!savedTracks.map(track => track.id).includes(track.id) && (<span
                    className="text-gray-600" onClick={addTrack ? async () => addTrack(track.id) : () => {
                }}> <PlusIcon height={24} width={24} color={colors.green["600"]}/> </span>)} </div>
        </li>
    )
}