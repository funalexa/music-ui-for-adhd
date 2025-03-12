"use client";
import {SearchResults, Track} from '@spotify/web-api-ts-sdk';
import {ChangeEvent, useState} from "react";
import {SearchResult} from "@/components/search-result";

export default function Search() {
    const sdk = globalThis.sdk;
    // ToDo add a fake search history underneath the search bar, the results should be displayed in the foreground
    // ToDo put a search icon into the input field

    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState<Track[]>([]);

    const handleSearch = async (event: ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        setSearchTerm(inputValue);

        let items: SearchResults<readonly ["track"]>;
        try {
            items = await sdk.search(inputValue, ["track", "artist"], 'DE', 5);
            setResults(items.tracks?.items)
        } catch (e) {
            console.warn(e);
        }
    }

    return (<>
        <div>
            <input type="text"

                   id="inputId"

                   placeholder="Search a track or an artist"

                   value={searchTerm ?? ""} onChange={handleSearch}

                   className="bg-[transparent] outline-none w-full py-3 pl-2 pr-3 border-gray-400 border-2 mb-5 rounded-md"/>
            {searchTerm && (<ul>
                {results.map(result => {
                    return (<SearchResult key={result.id} track={result}/>)
                })}

            </ul>)}
            {!searchTerm && (
                <div>
                    <h4>Last Searched</h4>
                    <ul>
                        <li>...</li>
                        <li>...</li>
                        <li>...</li>
                        <li>...</li>
                        <li>...</li>
                    </ul>
                </div>
            )}

        </div>
    </>)
}