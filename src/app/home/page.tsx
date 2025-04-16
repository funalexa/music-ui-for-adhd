'use client';
import {SavedAlbum, Track} from "@spotify/web-api-ts-sdk";
import {useEffect, useState} from "react";
import {ContentCard} from "@/components/home/content-card";
import {MusicTitleCard} from "@/components/home/music-title-card";
import {fallbackImage} from "@/constants";
import {useSDK} from "@/contexts/SDK";


export default function Home() {
    const {sdk} = useSDK();

    const [albumState, setAlbumState] = useState<SavedAlbum[]>([]);
    const [recentTracksState, setRecentTracksState] = useState<Track[]>();

    async function fetchSavedAlbums() {
        if (sdk) {
            try {
                //await sdk.getAccessToken().then(token => console.log(token));
                const albums = await sdk.currentUser.albums.savedAlbums(10, 0, 'DE');

                setAlbumState(albums.items);
            } catch (e) {
                console.warn(e)
            }
        }
    }

    async function fetchRecentTracks() {
        if (sdk) {
            try {
                const trackPage = await sdk.player.getRecentlyPlayedTracks(2);
                const tracks = trackPage.items.map(item => item.track);
                setRecentTracksState(tracks);
            } catch (e) {
                console.warn(e);
            }
        }

    }

    useEffect(() => {
        fetchSavedAlbums();
        fetchRecentTracks();
    }, [sdk]);

    return (<div className='grid grid-cols-2 gap-3'>
            <div className='mt-4 col-span-full'>
                <h4><strong>My Recently Listened To Songs</strong></h4></div>
            {recentTracksState?.map(track => <MusicTitleCard track={track} key={track.id}/>)}

            <div className='mt-4 col-span-full'><h4><strong>My Albums</strong></h4></div>
            {albumState.slice(0, 2).map(album => {
                return (<ContentCard key={album.album.id} text={album.album.name} link={`album/${album.album.id}`}
                                     image={album.album.images?.[0]?.url || fallbackImage}/>)
            })}

            <div className='mt-4 col-span-full'><h4><strong>My Music Collection</strong></h4></div>

            <ContentCard text='Go to Music Collection' link='my-collection' large/>
            <div className='mt-4 col-span-full'><h4><strong>New Recommendations For Me</strong></h4></div>
            <ContentCard text='Recommended Playlist of the Day' link='playlist/35fCf9Qa5JUhy2jhOduSSL' large/>
        </div>
    )
}