"use client";
import {LibraryTrackEntry} from "@/components/library-track-entry";
import {QuestionMarkCircleIcon, PlayCircleIcon} from "@heroicons/react/24/outline";
import colors from "tailwindcss/colors";
import "./collection.css";
import {useSavedTracks} from "@/contexts/SavedTracks";
import {useEffect} from "react";
import {useWebPlayer} from "@/contexts/SpotifyWebPlayer";


export default function MusicCollection() {
    const {savedTracks, reload} = useSavedTracks()
    const {startTrack, startWithShuffle} = useWebPlayer();
    console.log(savedTracks);

    useEffect(() => {
        if (!savedTracks.length) {
            reload();
        }
    }, [savedTracks]);

    async function startPlayBackInOrder() {
        await startTrack(undefined, savedTracks.map(track => track.uri))
    }

    async function startPlayBackOnShuffle() {
        await startWithShuffle(undefined, savedTracks.map(track => track.uri));
    }


    return (<div className='overflow-y-auto overflow-x-hidden'>
        <div className='mb-4 flex justify-center items-center'>
            <button
                className='play-shuffle-button border-2 border-sky-200 flex rounded-md mr-2 items-center justify-center'>
                <PlayCircleIcon height={24} width={24} color={colors.sky["600"]}
                                className='mr-1' onClick={startPlayBackInOrder}/> Play
            </button>
            <button
                className='play-shuffle-button border-2 border-sky-200 flex rounded-md ml-2 items-center justify-center' onClick={startPlayBackOnShuffle}>
                <QuestionMarkCircleIcon height={24} width={24} color={colors.sky["600"]} className='mr-1'/> Shuffle
            </button>
        </div>
        <ul> {savedTracks.map(track => <LibraryTrackEntry key={track.id} track={track}/>)} </ul>
    </div>)
}