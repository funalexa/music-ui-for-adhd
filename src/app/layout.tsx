'use client';
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import {MenuFooter} from "@/components/menu-footer";
import {PageTitle} from "@/components/page-title";
import {HistoryProvider} from '@/contexts/History'
import {SavedTracksProvider} from "@/contexts/SavedTracks";
import {Badge} from "@/components/badge";
import {SpotifyWebPlayerProvider} from "@/contexts/SpotifyWebPlayer";
import {PlaybackWidget} from "@/components/playback-widget/playback-widget";
import {SDKProvider} from "@/contexts/SDK";
import {useEffect} from "react";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});


export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    useEffect(() => {
        console.log('overwriting fetch');
        const originalFetch = window.fetch;
        window.fetch = async function(input, init) {
            console.log('called window.fetch');
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
            return originalFetch(input, init);
        };
    }, []);
    return (
        <html lang="en">
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        <SDKProvider>
            <HistoryProvider>
                <SavedTracksProvider>
                    <SpotifyWebPlayerProvider>
                        <div
                            className="grid grid-rows-[20px_660px_20px] justify-items-center min-h-screen pl-8 pr-8 pb-10 pt-6 sm:p-20 font-[family-name:var(--font-geist-sans)]">

                            <PageTitle/>
                            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start mt-3">
                                <>
                                    <Badge/>
                                    {children}
                                </>
                            </main>
                            <footer style={{marginTop: '20px'}}
                                    className="row-start-3 flex gap-6 flex-wrap items-center justify-center border-t-2 border-t-gray-500 pt-3">
                                <MenuFooter/>
                            </footer>
                        </div>
                        <PlaybackWidget/>
                    </SpotifyWebPlayerProvider>
                </SavedTracksProvider>
            </HistoryProvider>
        </SDKProvider>
        </body>
        </html>
    );
}
