"use client";
import {useParams} from 'next/navigation'
import {useEffect, useState} from "react";
import {Album} from "@spotify/web-api-ts-sdk";
import Image from "next/image";
import {TrackEntry} from "@/components/track-entry";
import "../../../components/album-playlist.css";
import {useSDK} from "@/contexts/SDK";


export default function AlbumPage() {
    const fallbackImage = 'https://cdn.pixabay.com/photo/2017/01/09/20/11/music-1967480_1280.png';
    const params = useParams()

    let albumId: string;
    if (params.albumId?.constructor.name == "Array") {
        albumId = params.albumId[0];
    } else {
        albumId = params.albumId as string;
    }

    const {sdk} = useSDK();

    const [albumState, setAlbumState] = useState<Album>();

    async function fetchAlbum() {
        if (sdk && albumId) {
            try {
                const album = await sdk.albums.get(albumId, 'DE');
                setAlbumState(album);
            } catch (e) {
                console.log(e)
            }
        }
    }

    useEffect(() => {
        fetchAlbum();
    }, [sdk]);
    return (<div className='grid grid-rows-[270_390] h-full'>
            <div className="title-header">
                <h1 className="flex justify-center"><strong>{albumState?.name}</strong></h1>
                <div className="flex justify-center mt-4">
                    <Image src={albumState?.images?.[0]?.url || fallbackImage}
                           alt={albumState?.name || 'Image of Album'}
                           width={192} height={192}/>
                </div>
                <p className="flex justify-center mt-4">{albumState?.artists.map(artist => artist.name).join(', ')}</p>
            </div>
            <div className='overflow-y-auto overflow-x-hidden track-list-container'>
                <ul className='track-list rounded-l mt-4'> {albumState?.tracks.items?.map(track => <TrackEntry
                    track={track}
                    key={track.id}/>)}</ul>
            </div>
        </div>
    );
}