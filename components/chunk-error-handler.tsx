"use client"

import { useEffect } from "react"

export function ChunkErrorHandler() {
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      if (event.message.includes("Loading chunk") || event.message.includes("ChunkLoadError")) {
        const hasReloaded = sessionStorage.getItem("chunk-error-reloaded")
        if (!hasReloaded) {
          sessionStorage.setItem("chunk-error-reloaded", "true")
          window.location.reload()
        }
      }
    }

    window.addEventListener("error", handleError)
    return () => window.removeEventListener("error", handleError)
  }, [])

  return null
}
