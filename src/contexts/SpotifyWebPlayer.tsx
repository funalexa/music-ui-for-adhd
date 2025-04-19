'use client';
import React, {createContext, ReactNode, useContext, useEffect, useState} from 'react'

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
    const sdk = globalThis.sdk;

    const [player, setPlayer] = useState<Spotify.Player>();
    const [isPaused, setPaused] = useState(false);
    const [isActive, setActive] = useState(false);
    const [currentTrack, setCurrentTrack] = useState<Spotify.Track | undefined>();
    const [deviceId, setDeviceId] = useState<string | undefined>();


    useEffect(() => {
        if (sdk) {
            console.log('overwriting fetch');
            const originalFetch = window.fetch;
            window.fetch = async function(input, init) {
                console.log('window.fetch');
                const url = typeof input === 'string' ? input : input instanceof URL ? input.toString() : input.url;
                console.log(url)

                // If this is a request to Spotify's analytics endpoint, handle specially
                if (url.includes('cpapi.spotify.com') || url.includes('event/item_before_load')) {
                    try {
                        const response = await originalFetch(input, init);

                        // If we get a 404 or 400, return a fake successful response
                        if (response.status === 404 || response.status === 400) {
                            console.log(`Intercepted ${response.status} response for ${url.split('?')[0]}`);
                            return new Response(JSON.stringify({success: true}), {
                                status: 200,
                                headers: {'Content-Type': 'application/json'}
                            });
                        }
                        return response;
                    } catch (error) {
                        console.log(`Intercepted fetch error for ${url.split('?')[0]}`);
                        console.warn(error);
                        // Return a fake successful response instead of throwing
                        return new Response(JSON.stringify({success: true}), {
                            status: 200,
                            headers: {'Content-Type': 'application/json'}
                        });
                    }
                }

                // Pass through normal requests
                else return originalFetch(input, init);
            };

            const script = document.createElement("script");
            script.src = "http://sdk.scdn.co/spotify-player.js";
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
            //const playerState = await player?.getCurrentState();
            //console.log('shuffle is ' + playerState?.shuffle);
            //if (!playerState || playerState?.shuffle) {
       //         try {
           //         await sdk.player.togglePlaybackShuffle(false, deviceId)
         //       } catch (e) {
           //         console.warn(e)
           //     }
            //}
            console.log('resuming playback now');
            try {
                //await sdk.player.startResumePlayback(deviceId, contextUri, songUri);
                await sdk.makeRequest("PUT", `me/player/play?device_id=${deviceId}`, {
                    context_uri: contextUri,
                    uris: songUri
                });
                console.log('started resumeplayback');
            } catch (e) {console.log(e)}
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
