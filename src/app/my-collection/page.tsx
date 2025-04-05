"use client";
import {useEffect, useState} from "react";
import {Track} from "@spotify/web-api-ts-sdk";
import {LibraryTrackEntry} from "@/components/library-track-entry";
import {QuestionMarkCircleIcon, PlayCircleIcon} from "@heroicons/react/24/outline";
import colors from "tailwindcss/colors";
import "./collection.css";


export default function MusicCollection() {
    const sdk = globalThis.sdk;

    const [savedTrackState, setSavedTrackState] = useState<Track[]>([]);

    async function fetchSavedMusic() {
        //const albums = await sdk.currentUser.albums.savedAlbums();
        const tracks = await sdk.currentUser.tracks.savedTracks();
        return tracks.items;
    }

    useEffect(() => {
        async function loadData() {
            const fetchedTracks = await fetchSavedMusic();
            setSavedTrackState(fetchedTracks.map(track => track.track).sort((trackA, trackB) => trackA.name.localeCompare(trackB.name)));
        }

        loadData();
    }, [globalThis.sdk]);

    return (<div className='overflow-y-auto overflow-x-hidden'>
        <div className='mb-4 flex justify-center items-center'>
            <button className='play-shuffle-button border-2 border-sky-200 flex rounded-md mr-2 items-center justify-center'><PlayCircleIcon height={24} width={24} color={colors.sky["600"]}
                              className='mr-1'/> Play
            </button>
            <button className='play-shuffle-button border-2 border-sky-200 flex rounded-md ml-2 items-center justify-center'><QuestionMarkCircleIcon height={24} width={24} color={colors.sky["600"]} className='mr-1'/> Shuffle
            </button>
        </div>
        <ul> {savedTrackState.map(track => <LibraryTrackEntry key={track.id} track={track}/>)} </ul>
    </div>)
}