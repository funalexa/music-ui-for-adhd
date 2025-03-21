'use client';
import {SavedAlbum, SpotifyApi} from "@spotify/web-api-ts-sdk";
import {useEffect, useState} from "react";
import {ContentCard} from "@/components/home/content-card";
import {MusicTitleCard} from "@/components/home/music-title-card";



export default function Home() {
    const sdk = globalThis.sdk;

  const [albumState, setAlbumState] = useState<SavedAlbum[]>([]);

    async function fetchSavedAlbums() {
        console.log(sdk);
        if (sdk) {
            try {
                await sdk.getAccessToken().then(token => console.log(token));
                const albums = await sdk.currentUser.albums.savedAlbums(10, 0, 'DE');
                console.log(albums);
                setAlbumState(albums.items);
            }
            catch (e) {console.log(e)}
        }
    }

    useEffect(() => {
        fetchSavedAlbums();
    }, [globalThis.sdk]);



    //sdk.currentUser.albums.savedAlbums()
    // get two last recently played tracks and show them in small tiles
    // add a link to own music collection -> all tracks
    // add one or two recommendations in larger tiles
    // only 4 elements on home screen, large!!
    return (<div className='grid grid-cols-2 gap-4'>
            <div className='mt-4 col-span-full'>
                <h4>My Songs</h4></div>
            <MusicTitleCard/>
            <MusicTitleCard/>

            <div className='mt-4 col-span-full'><h4>My Albums</h4></div>
            <ContentCard text='Album 1'/>
            <ContentCard text='Album 2'/>

            <div className='mt-4 col-span-full'><h4>My Music Collection</h4></div>

            <ContentCard text='Go to Music Collection' link='my-collection' large/>
            <div className='mt-4 col-span-full'><h4>New Recommendations For Me</h4></div>
            <ContentCard text='Recommended Playlist of the Day' large/>
            {albumState.map(album => album.album.name).join(', ')}
        </div>
    )
}