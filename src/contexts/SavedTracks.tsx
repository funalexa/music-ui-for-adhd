import React, {createContext, ReactNode, useContext, useEffect, useState} from 'react'
import {Track} from "@spotify/web-api-ts-sdk";

interface STValidation {
    savedTracks: Track[];

    addTrack(trackId: string): Promise<void>;

    reload(): Promise<void>;

    showSuccessBadge: boolean;
}

const SavedTracksContext = createContext<STValidation>({} as STValidation)
export const SavedTracksProvider = ({children}: { children: ReactNode | ReactNode[] }) => {
    const sdk = globalThis.sdk;

    const [savedTracks, setSavedTracks] = useState<Track[]>([])

    const [showSuccessBadge, setShowSuccessBadge] = useState<boolean>(false);

    async function reload() {
        console.log('');
        if (sdk) {
            const tracks = await sdk.currentUser.tracks.savedTracks();
            setSavedTracks(tracks.items.map(track => track.track).sort((trackA, trackB) => trackA.name.localeCompare(trackB.name)));
        }
    }

    async function addTrack(trackId: string) {
        if (sdk) {
            await sdk.makeRequest("PUT", "me/tracks", {
                ids: [trackId],
            }).then(() => openSuccessBadge());
        }
        await reload();
    }

    function openSuccessBadge() {
        setShowSuccessBadge(true);
        setTimeout(() => setShowSuccessBadge(false), 2000);
    }

    useEffect(() => {
        reload();
    }, [sdk])

    return (
        <SavedTracksContext.Provider
            value={{
                savedTracks,
                addTrack,
                showSuccessBadge,
                reload
            }}
        >
            {children}
        </SavedTracksContext.Provider>
    )
}

export function useSavedTracks(): STValidation {
    return useContext(SavedTracksContext)
}
