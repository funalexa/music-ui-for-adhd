'use client';
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import {MenuFooter} from "@/components/menu-footer";
import {PageTitle} from "@/components/page-title";
import {SpotifyApi} from "@spotify/web-api-ts-sdk";
import {useEffect} from "react";
import {Scopes} from "@/scopes";
import {HistoryProvider} from '@/contexts/History'
import {SavedTracksProvider} from "@/contexts/SavedTracks";
import {CheckCircleIcon} from "@heroicons/react/24/outline";
import colors from "tailwindcss/colors";
import {Badge} from "@/components/badge";
import {SpotifyWebPlayerProvider} from "@/contexts/SpotifyWebPlayer";
import {PlaybackWidget} from "@/components/playback-widget/playback-widget";
import {SDKProvider} from "@/contexts/SDK";

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
                            className="grid grid-rows-[20px_660px_20px] justify-items-center min-h-screen p-8 pb-10 sm:p-20 font-[family-name:var(--font-geist-sans)]">

                            <PageTitle/>
                            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
                                <>
                                    <Badge/>
                                    {children}
                                </>
                            </main>
                            <footer style={{marginTop: '50px'}}
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
