"use client";
import {useParams} from 'next/navigation'
import {useEffect, useState} from "react";
import {Playlist, Track} from "@spotify/web-api-ts-sdk";
import Image from "next/image";
import {TrackEntry} from "@/components/track-entry";
import "../../../components/album-playlist.css";
import {useSavedTracks} from "@/contexts/SavedTracks";
import {useSDK} from "@/contexts/SDK";


export default function PlaylistPage() {
    const params = useParams()

    let playlistId: string;

    const fallbackImage = 'https://cdn.pixabay.com/photo/2017/01/09/20/11/music-1967480_1280.png';
    if (params.playlistId?.constructor.name == "Array") {
        playlistId = params.playlistId[0];
    } else {
        playlistId = params.playlistId as string;
    }

    const {sdk} = useSDK();
    const {savedTracks, addTrack} = useSavedTracks();

    const [playListState, setPlaylistState] = useState<Playlist<Track>>();

    async function fetchPlaylist() {
        if (sdk && playlistId) {
            try {
                const playList = await sdk.playlists.getPlaylist(playlistId, 'DE');
                setPlaylistState(playList);
            } catch (e) {
                console.log(e)
            }
        }
    }

    async function addToSavedTracks(trackId: string) {
        await addTrack(trackId);
    }

    useEffect(() => {
        fetchPlaylist();
    }, [sdk, playlistId]);
    return (<div className='grid grid-rows-[270_390]'>
        <div className="title-header">
            <h1 className="flex justify-center">{playListState?.name}</h1>
            <div className="flex justify-center mt-4">
                <Image src={playListState?.images?.[0]?.url || fallbackImage}
                       alt={playListState?.name || 'Image of Album'}
                       width={192} height={192}/>
            </div>
            <p className="flex justify-center mt-4">{playListState?.owner.display_name}</p>
        </div>
        <div className='overflow-y-auto overflow-x-hidden'>
            <ul className='track-list rounded-l mt-4'> {playListState?.tracks.items?.map(track => <TrackEntry
                track={track.track}
                key={track.track.id.concat(track.added_at)} isInPlayList={true}
                includedInOwnLibrary={savedTracks.map(savedTracks => savedTracks.id).includes(track.track.id)}
                addTrack={() => addToSavedTracks(track.track.id)}/>)}</ul>
        </div>

    </div>);
}