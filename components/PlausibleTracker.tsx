'use client'

import { useEffect } from 'react'

export default function PlausibleTracker() {
  useEffect(() => {
    const script = document.createElement('script')
    script.setAttribute('defer', '')
    script.setAttribute('data-domain', 'asep2025.otter-verse.com')
    script.src = 'https://analytics.otter-verse.com/js/script.js'
    document.head.appendChild(script); 

    (window as any).plausible = (window as any).plausible || function (...args: any[]) {
      ;((window as any).plausible.q = (window as any).plausible.q || []).push(args)
    }
  }, [])

  return null
}
