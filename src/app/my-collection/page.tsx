"use client";
import {useEffect, useState} from "react";
import {SavedTrack} from "@spotify/web-api-ts-sdk";



export default function MusicCollection() {
    const sdk = globalThis.sdk;

    const [savedTrackState, setSavedTrackState] = useState<SavedTrack[]>([]);

    async function fetchSavedMusic() {
        //const albums = await sdk.currentUser.albums.savedAlbums();
        const tracks = await sdk.currentUser.tracks.savedTracks();
        return tracks.items;
    }

    useEffect(() => {
        async function loadData() {
            const fetchedTracks = await fetchSavedMusic();
            setSavedTrackState(fetchedTracks);
        }
        loadData();
    }, [globalThis.sdk]);

    return (<div> {savedTrackState.map(track => track.track.name).join(', ')} </div>)
}