"use client";
import {SearchResults, SpotifyApi, Track} from '@spotify/web-api-ts-sdk';
import {ChangeEvent, useState} from "react";

const spotifyClientId = process.env.NEXT_PUBLIC_AUTH_SPOTIFY_ID!;
const spotifyClientSecret = process.env.NEXT_PUBLIC_AUTH_SPOTIFY_SECRET!;

export default function Search() {
    const sdk = SpotifyApi.withClientCredentials(spotifyClientId, spotifyClientSecret);

    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState<Track[]>([]);

    const handleSearch = async (event: ChangeEvent<HTMLInputElement>) => {

        const inputValue = event.target.value;

        setSearchTerm(inputValue);

        let items: SearchResults<readonly ["track"]>;
        try {
            console.log(spotifyClientId);
            console.log(spotifyClientSecret);
            console.log(process.env.NODE_ENV);
            items = await sdk.search(inputValue, ["track"], 'DE', 5);
            setResults(items.tracks?.items)
        } catch (e) {
            console.warn(e);
            console.warn(JSON.stringify(e));
        }
    }

    return (<><h2>ToDo: Search</h2>
        <div>
            <input type="text"

                   id="inputId"

                   placeholder="Enter your keywords"

                   value={searchTerm ?? ""} onChange={handleSearch}

                   className="bg-[transparent] outline-none border-none w-full py-3 pl-2 pr-3"/>
            {results.map(result => result.name).join(', ')}
        </div>
    </>)
}