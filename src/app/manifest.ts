import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Music UI',
        short_name: 'Music UI',
        description: 'Music UI for ADHD',
        start_url: '/',
        display: 'standalone',
    }
}