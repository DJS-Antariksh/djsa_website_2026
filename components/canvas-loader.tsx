'use client'

import dynamic from 'next/dynamic'

const SiteCanvas = dynamic(() => import('./site-canvas'), {
    ssr: false,
})

export default function CanvasLoader() {
    return <SiteCanvas />
}
