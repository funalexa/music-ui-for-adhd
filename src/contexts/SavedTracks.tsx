import React, {createContext, ReactNode, useContext, useEffect, useState} from 'react'
import {Track} from "@spotify/web-api-ts-sdk";

interface STValidation {
    savedTracks: Track[]

    addTrack(trackId: string): Promise<void>
}

const SavedTracksContext = createContext<STValidation>({} as STValidation)
export const SavedTracksProvider = ({children}: { children: ReactNode | ReactNode[] }) => {
    const sdk = globalThis.sdk;

    const [savedTracks, setSavedTracks] = useState<Track[]>([])

    async function reload() {
        if (sdk) {
            const tracks = await sdk.currentUser.tracks.savedTracks();
            setSavedTracks(tracks.items.map(track => track.track).sort((trackA, trackB) => trackA.name.localeCompare(trackB.name)));
        }
    }

    async function addTrack(trackId: string) {
        if (sdk) {
            await sdk.makeRequest("PUT", "me/tracks", {
                ids: [trackId],
            })
            console.log(`added track with id ${trackId}`)
        }
        await reload();
    }

    useEffect(() => {
        reload();
    }, [sdk, reload])

    return (
        <SavedTracksContext.Provider
            value={{
                savedTracks,
                addTrack,
            }}
        >
            {children}
        </SavedTracksContext.Provider>
    )
}

export function useSavedTracks(): STValidation {
    return useContext(SavedTracksContext)
}
