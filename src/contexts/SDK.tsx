'use client';

import React, {createContext, ReactNode, useContext, useEffect, useState} from 'react'
import {IResponseDeserializer, SpotifyApi} from "@spotify/web-api-ts-sdk";
import {Scopes} from "@/scopes";

interface SDKValidation {
    sdk: SpotifyApi | undefined;

}

const spotifyClientId = process.env.NEXT_PUBLIC_AUTH_SPOTIFY_ID!;
const spotifyCallBackURL = process.env.NEXT_PUBLIC_CALLBACK_URL!;


export default class FixedResponseDeserializer
    implements IResponseDeserializer {
    public async deserialize<TReturnType>(
        response: Response,
    ): Promise<TReturnType> {
        const text = await response.text();

        const contentType = response.headers.get("content-type") ?? '';

        if (text.length > 0 && contentType.includes("application/json")) {
            const json = JSON.parse(text);
            return json as TReturnType;
        }

        return null as TReturnType;
    }
}

const SDKContext = createContext<SDKValidation>({} as SDKValidation)
export const SDKProvider = ({children}: { children: ReactNode | ReactNode[] }) => {

    const [sdk, setSDK] = useState<SpotifyApi>();

    async function setUpAuth() {
        console.log('setting sdk now in context');
        globalThis.sdk = SpotifyApi.withUserAuthorization(spotifyClientId, spotifyCallBackURL, Scopes.all, {
            deserializer: new FixedResponseDeserializer(),
        });
        await globalThis.sdk.authenticate().then((authRes) => console.log(authRes));
    }

    useEffect(() => {
        if (!globalThis.sdk) {
            setUpAuth();
        }
        setSDK(globalThis.sdk);
    }, []);

    return (
        <SDKContext.Provider
            value={{
                sdk
            }}
        >
            {children}
        </SDKContext.Provider>
    )
}

export function useSDK(): SDKValidation {
    return useContext(SDKContext)
}
