import {SimplifiedTrack, SpotifyApi} from "@spotify/web-api-ts-sdk";

interface ISearchResultProps {
    track: SimplifiedTrack;
}

export const SearchResult = ({track}: ISearchResultProps) => {
    const sdk = globalThis.sdk;

    function playSong() {
        // ToDo: initialize a player, probably somewhere else in the application, connect to it and play music
    }

    return (<li key={track.id}>{track.name} - {track.artists.map(artist => artist.name).join(',')}</li>)
}