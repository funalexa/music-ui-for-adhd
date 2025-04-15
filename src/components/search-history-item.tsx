import {useEffect, useState} from "react";
import {Album} from "@spotify/web-api-ts-sdk";
import Image from "next/image";
import './search-history-item.css';
import {useSDK} from "@/contexts/SDK";

interface ISearchHistoryItemProps {
    track: string;
    artist: string;
    albumId: string;
}

const fallbackImage = 'https://cdn.pixabay.com/photo/2017/01/09/20/11/music-1967480_1280.png';

export const SearchHistoryItem = ({track, artist, albumId}: ISearchHistoryItemProps) => {
    const {sdk} = useSDK();

    const [album, setAlbum] = useState<Album>()

    async function fetchAlbumCover() {
        if (sdk) {
            const fetchedAlbum = await sdk.albums.get(albumId, 'DE');
            setAlbum(fetchedAlbum);
        }
    }

    useEffect(() => {
        fetchAlbumCover();
    }, [sdk]);

    return (<li className='mb-4 search-history-item border-b-gray-200 border-b-2 pb-4'> <div className='album-image'> <Image src={album?.images?.[0]?.url || fallbackImage} alt={album?.name || 'Image of Album'} width={48} height={48}/> </div> <div className='pr-4 pl-1'> <strong> {track} </strong> {artist} </div ></li>);
}