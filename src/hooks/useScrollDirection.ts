import { useState, useEffect } from 'react'

const SCROLL_UP = 'up'
const SCROLL_DOWN = 'down'

// https://gist.github.com/reecelucas/cd110ece696cca8468db895281fa28cb
export const useScrollDirection = () => {
  const [scrollDir, setScrollDir] = useState(SCROLL_UP)

  useEffect(() => {
    const threshold = 0
    let lastScrollY = window.pageYOffset
    let ticking = false

    const updateScrollDir = () => {
      const scrollY = window.pageYOffset

      if (Math.abs(scrollY - lastScrollY) < threshold) {
        ticking = false
        return
      }

      setScrollDir(scrollY > lastScrollY ? SCROLL_DOWN : SCROLL_UP)
      lastScrollY = scrollY > 0 ? scrollY : 0
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDir)
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll)

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return scrollDir
}
