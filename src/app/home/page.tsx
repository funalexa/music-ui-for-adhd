'use client';
import {SavedAlbum, SpotifyApi} from "@spotify/web-api-ts-sdk";
import {useEffect, useState} from "react";
import {ContentCard} from "@/components/home/content-card";



export default function Home() {
    const sdk = globalThis.sdk;

  const [albumState, setAlbumState] = useState<SavedAlbum[]>([]);

    async function fetchSavedAlbums() {
        const albums = await sdk.currentUser.albums.savedAlbums();
        console.log(albums);
        return albums.items;
    }

    useEffect(() => {
        async function loadData() {
            const fetchedAlbums = await fetchSavedAlbums();
            setAlbumState(fetchedAlbums);
        }
        loadData();
    }, [globalThis.sdk]);



    //sdk.currentUser.albums.savedAlbums()
    // get two last recently played tracks and show them in small tiles
    // add a link to own music collection -> all tracks
    // add one or two recommendations in larger tiles
    // only 4 elements on home screen, large!!
    return (<div>
        <ContentCard/>
        <ContentCard/>
    <ContentCard/>
        {albumState.map(album => album.album.name).join(', ')}
    </div>)
}