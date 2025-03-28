"use client";
import { useParams } from 'next/navigation'
import {useHistory} from "@/contexts/History";
import {useEffect, useState} from "react";
import {Album} from "@spotify/web-api-ts-sdk";
import Image from "next/image";


export default function AlbumPage() {
    // TODO: use history to show breadcrumbs, did the user come from home or search or where?
    const fallbackImage = 'https://cdn.pixabay.com/photo/2017/01/09/20/11/music-1967480_1280.png';
    const params = useParams()
    const { history } = useHistory();
    console.log(history);
    let albumId: string;
    if (params.albumId?.constructor.name == "Array") {
        albumId = params.albumId[0];
    } else {
        albumId = params.albumId as string;
    }

    const sdk = globalThis.sdk;

    const [albumState, setAlbumState] = useState<Album>();

    async function fetchAlbum() {
        console.log(sdk);
        if (sdk && albumId) {
            try {
                const album = await sdk.albums.get(albumId, 'DE');
                setAlbumState(album);
            }
            catch (e) {console.log(e)}
        }
    }

    useEffect(() => {
        fetchAlbum();
    }, [globalThis.sdk]);
    return <div> <h4>{albumState?.name}</h4>
        <p>{albumState?.artists.map(artist => artist.name).join(', ')}</p>
        <Image src={albumState?.images?.[0]?.url || fallbackImage} alt={albumState?.name || 'Image of Album'} width={124} height={124}/>
    </div>
}