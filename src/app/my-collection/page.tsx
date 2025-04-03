"use client";
import {useEffect, useState} from "react";
import {Track} from "@spotify/web-api-ts-sdk";
import {LibraryTrackEntry} from "@/components/library-track-entry";


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

    return (<div className='overflow-scroll'>
        <ul> {savedTrackState.map(track => <LibraryTrackEntry key={track.id} track={track}/>)} </ul>
    </div>)
}