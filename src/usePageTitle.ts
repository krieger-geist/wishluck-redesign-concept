import { useEffect } from 'react'

export function usePageTitle(title: string) {
  useEffect(() => {
    document.title = `${title} | WishLuck Redesign Concept (Unofficial)`
  }, [title])
}
