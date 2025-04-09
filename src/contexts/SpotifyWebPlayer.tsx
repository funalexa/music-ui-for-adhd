import React, {createContext, ReactNode, useContext, useEffect, useState} from 'react'

interface SpWPValidation {
    player: Spotify.Player | undefined;
    isPaused: boolean;
    isActive: boolean;
    currentTrack: Spotify.Track | undefined;
}

const SpotifyWebPlayerContext = createContext<SpWPValidation>({} as SpWPValidation)
export const SpotifyWebPlayerProvider = ({children}: { children: ReactNode | ReactNode[] }) => {
    const sdk = globalThis.sdk;

    const [player, setPlayer] = useState<Spotify.Player>();
    const [isPaused, setPaused] = useState(false);
    const [isActive, setActive] = useState(false);
    const [currentTrack, setCurrentTrack] = useState<Spotify.Track | undefined>();


    useEffect(() => {
        if (sdk) {
            const script = document.createElement("script");
            script.src = "https://sdk.scdn.co/spotify-player.js";
            script.async = true;

            document.body.appendChild(script);

            window.onSpotifyWebPlaybackSDKReady = async () => {
                const token = await sdk.getAccessToken();
                if (!token) console.error('No access token present!')
                const player = new window.Spotify.Player({
                    name: 'Web Playback SDK',
                    getOAuthToken: (cb) => {
                        cb(token?.access_token || token?.refresh_token || '');
                    },
                    volume: 0.5
                });

                setPlayer(player);

                player.addListener('ready', ({device_id}: { device_id: string }) => {
                    console.log('Ready with Device ID', device_id);
                });

                player.addListener('not_ready', ({device_id}: { device_id: string }) => {
                    console.log('Device ID has gone offline', device_id);
                });

                player.addListener('player_state_changed', (state => {

                    if (!state) {
                        return;
                    }

                    setCurrentTrack(state.track_window.current_track);
                    setPaused(state.paused);


                    player.getCurrentState().then(state => {
                        if (!state) setActive(false);
                        else setActive(true)
                    });

                }));


                await player.connect();

            };
        }


    }, [sdk]);

    return (
        <SpotifyWebPlayerContext.Provider
            value={{
                player,
                isActive,
                isPaused,
                currentTrack
            }}
        >
            {children}
        </SpotifyWebPlayerContext.Provider>
    )
}

export function useWebPlayer(): SpWPValidation {
    return useContext(SpotifyWebPlayerContext)
}
