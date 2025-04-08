"use client";
import {LibraryTrackEntry} from "@/components/library-track-entry";
import {QuestionMarkCircleIcon, PlayCircleIcon} from "@heroicons/react/24/outline";
import colors from "tailwindcss/colors";
import "./collection.css";
import {useSavedTracks} from "@/contexts/SavedTracks";
import {useEffect} from "react";


export default function MusicCollection() {
    const {savedTracks, reload} = useSavedTracks()
    console.log(savedTracks);

    useEffect(() => {
        if (!savedTracks.length) {
            reload();
        }
    }, [savedTracks]);


    return (<div className='overflow-y-auto overflow-x-hidden'>
        <div className='mb-4 flex justify-center items-center'>
            <button
                className='play-shuffle-button border-2 border-sky-200 flex rounded-md mr-2 items-center justify-center'>
                <PlayCircleIcon height={24} width={24} color={colors.sky["600"]}
                                className='mr-1'/> Play
            </button>
            <button
                className='play-shuffle-button border-2 border-sky-200 flex rounded-md ml-2 items-center justify-center'>
                <QuestionMarkCircleIcon height={24} width={24} color={colors.sky["600"]} className='mr-1'/> Shuffle
            </button>
        </div>
        <ul> {savedTracks.map(track => <LibraryTrackEntry key={track.id} track={track}/>)} </ul>
    </div>)
}