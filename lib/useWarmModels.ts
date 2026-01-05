import { useEffect } from 'react'
import { useGLTF } from '@react-three/drei'

/**
 * Progressive model warm-up hook using idle-time loading
 * Replaces bulk Promise.all() preloading to prevent main thread blocking
 */
export function useWarmModels(models: string[]) {
  useEffect(() => {
    let i = 0
    let cancelled = false
    
    function warmNext() {
      if (cancelled || i >= models.length) return
      
      // Preload one model at a time during idle periods
      useGLTF.preload(models[i++])
      
      // Schedule next warm-up during browser idle time
      // timeout ensures it runs even if browser is busy
      if ('requestIdleCallback' in window) {
        requestIdleCallback(warmNext, { timeout: 500 })
      } else {
        // Fallback for browsers without requestIdleCallback
        setTimeout(warmNext, 100)
      }
    }
    
    // Start warming after initial render (1 second delay)
    if ('requestIdleCallback' in window) {
      requestIdleCallback(warmNext, { timeout: 1000 })
    } else {
      setTimeout(warmNext, 1000)
    }

    return () => {
      cancelled = true
    }
  }, [models])
}
