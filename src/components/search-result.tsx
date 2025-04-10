import {SimplifiedTrack} from "@spotify/web-api-ts-sdk";
import './search-result.css';
import {PlayIcon, PlusIcon} from "@heroicons/react/24/solid";
import colors from "tailwindcss/colors";
import {useSavedTracks} from "@/contexts/SavedTracks";
import {useWebPlayer} from "@/contexts/SpotifyWebPlayer";

interface ISearchResultProps {
    track: SimplifiedTrack;
}

export const SearchResult = ({track}: ISearchResultProps) => {

    const {savedTracks, addTrack} = useSavedTracks();
    const {startTrack} = useWebPlayer();

    async function playSong() {
        await startTrack(undefined, [track.uri]);
    }

    return (
        <li className='search-result-item bg-gray-100 border-gray-200 border-l-2 border-r-2 border-b-2' key={track.id}
            >
            <div className='play-button' onClick={playSong}>
                <button className='bg-transparent border-none'><PlayIcon height={16} width={16}
                                                                         className='mt-3 fill-sky-600'/></button>
            </div>
            <div className='pr-4 pl-1' onClick={playSong}>
                <strong>{track.name} </strong> {track.artists.map(artist => artist.name).join(', ')}
            </div>
            <div className="float-right track-duration">
                {!savedTracks.map(track => track.id).includes(track.id) && (<span
                    className="text-gray-600" onClick={addTrack ? async () => addTrack(track.id) : () => {
                }}> <PlusIcon height={24} width={24} color={colors.green["600"]}/> </span>)} </div>
        </li>
    )
}