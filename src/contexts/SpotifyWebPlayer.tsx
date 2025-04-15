import React, {createContext, ReactNode, useContext, useEffect, useState} from 'react'
import {useSDK} from "@/contexts/SDK";

interface SpWPValidation {
    player: Spotify.Player | undefined;
    isPaused: boolean;
    isActive: boolean;
    currentTrack: Spotify.Track | undefined;
    startTrack: (contextUri?: string, songUri?: string[]) => Promise<void>;
    startWithShuffle: (contextUri?: string, songUri?: string[]) => Promise<void>;
    stopTrack: () => Promise<void>;
    forward: () => Promise<void>;
    backward: () => Promise<void>;

}

const SpotifyWebPlayerContext = createContext<SpWPValidation>({} as SpWPValidation)
export const SpotifyWebPlayerProvider = ({children}: { children: ReactNode | ReactNode[] }) => {
    const {sdk} = useSDK();

    const [player, setPlayer] = useState<Spotify.Player>();
    const [isPaused, setPaused] = useState(false);
    const [isActive, setActive] = useState(false);
    const [currentTrack, setCurrentTrack] = useState<Spotify.Track | undefined>();
    const [deviceId, setDeviceId] = useState<string | undefined>();


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
                    setDeviceId(device_id);
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

    async function startTrack(contextUri?: string, songUri?: string[]) {
        console.log('starting track');
        setActive(true);
        if (deviceId && sdk) {
            console.log(deviceId);
            const playerState = await player?.getCurrentState();
            console.log('shuffle is ' + playerState?.shuffle);
            if (!playerState || playerState?.shuffle) {
                try {
                    await sdk.player.togglePlaybackShuffle(false, deviceId)
                } catch (e) {
                    console.warn(e)
                }
            }
            console.log('resuming playback now');
            await sdk.player.startResumePlayback(deviceId, contextUri, songUri);
        } else console.warn('Player has not been initialised!')
    }

    async function startWithShuffle(contextUri?: string, songUri?: string[]) {
        console.log('starting shuffle');
        setActive(true);
        if (deviceId && sdk) {
            const playerState = await player?.getCurrentState();
            if (playerState && !playerState.shuffle) {
                await sdk.player.togglePlaybackShuffle(true, deviceId)
            }
            await sdk.player.startResumePlayback(deviceId, contextUri, songUri);
        } else console.warn('Player has not been initialised!')
    }

    async function stopTrack() {
        if (deviceId && sdk) {
            await sdk.player.pausePlayback(deviceId);
        }
    }

    async function forward() {
        if (deviceId && sdk) {
            await sdk.player.skipToNext(deviceId);
        }
    }

    async function backward() {
        if (deviceId && sdk) {
            await sdk.player.skipToPrevious(deviceId);
        }
    }

    return (
        <SpotifyWebPlayerContext.Provider
            value={{
                player,
                isActive,
                isPaused,
                currentTrack,
                startTrack, stopTrack, startWithShuffle, forward, backward
            }}
        >
            {children}
        </SpotifyWebPlayerContext.Provider>
    )
}

export function useWebPlayer(): SpWPValidation {
    return useContext(SpotifyWebPlayerContext)
}
