import type { MetadataRoute } from 'next'
import {fallbackImage} from "@/constants";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Music UI',
        short_name: 'Music UI',
        description: 'Music UI for ADHD',
        start_url: '/',
        display: 'standalone',
        icons: [{
            src: fallbackImage,
            sizes: 'any',
            type: 'image/x-icon',
        },]
    }
}