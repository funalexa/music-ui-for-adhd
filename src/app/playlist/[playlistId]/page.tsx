"use client";
import { useParams } from 'next/navigation'


export default function Playlist() {
    const params = useParams()

    const playlistId = params.playlistId;
    return <p>Post: {playlistId}</p>
}