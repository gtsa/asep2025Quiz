'use client'

import { useEffect } from 'react'

export default function ServiceWorkerRegister() {
  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      'serviceWorker' in navigator &&
      process.env.NODE_ENV === 'production'
    ) {
      navigator.serviceWorker
        .register('/sw.js')
        .then(() => console.log('✅ Service Worker registered'))
        .catch(err => console.error('❌ SW registration failed:', err))
    }
  }, [])

  return null
}
