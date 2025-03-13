"use client";
import {SearchResults, Track} from '@spotify/web-api-ts-sdk';
import {ChangeEvent, useState} from "react";
import {SearchResult} from "@/components/search-result";
import {MagnifyingGlassIcon} from "@heroicons/react/24/outline";
import './search.css';
import {SearchHistoryItem} from "@/components/search-history-item";

export default function Search() {
    const sdk = globalThis.sdk;

    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState<Track[]>([]);

    const handleSearch = async (event: ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        setSearchTerm(inputValue);

        let items: SearchResults<readonly ["track"]>;
        try {
            items = await sdk.search(inputValue, ["track", "artist", "album"], 'DE', 5);
            console.log(items.tracks);
            setResults(items.tracks?.items)
        } catch (e) {
            console.warn(e);
        }
    }

    return (<>
        <div>
            <div
                className="search-input-container bg-[transparent] outline-none w-full py-3 pl-2 pr-3 border-gray-400 border-2 mb-0 rounded-md">
                <MagnifyingGlassIcon height={16}/>

                <input type="text"
                       id="inputId"
                       className="pr-4 pl-2 input-field"
                       placeholder="search track, artist or album"
                       value={searchTerm ?? ""} onChange={handleSearch}

                />
            </div>
            {searchTerm && (<ul className='rounded-l'>
                {results.map(result => {
                    return (<SearchResult key={result.id} track={result}/>)
                })}

            </ul>)}
            {!searchTerm && (
                <div className='mt-4'>
                    <h4>Last Searched</h4>
                    <ul className='ml-4 mt-4'>
                        <SearchHistoryItem key='track1' track='Barbie Girl' artist='Aqua' albumId='3hHmYc6mrl6NkmRW1ZwYvm'/>
                        <SearchHistoryItem key='track2' track='Highway To Hell' artist='AC/DC' albumId='10v912xgTZbjAtYfyKWJCS'/>
                        <SearchHistoryItem key='track3' track='The Weekend' artist='Michael Gray' albumId='1v1bEFD6ZgEvAbrMJqK1Oz'/>
                        <SearchHistoryItem key='track4' track='Droom Groot' artist='Joost' albumId='4AktaNi30I0MGG0iK0IQ4X'/>
                        <SearchHistoryItem key='track5' track='Deep Down (feat. Never Dull)'
                                           artist='Alok, Ella Eyre, Kenny Dope, Never Dull' albumId='3KpxpdySrMR2S7noneu1bI'/>
                    </ul>
                </div>
            )}

        </div>
    </>)
}