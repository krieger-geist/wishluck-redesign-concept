import { useEffect } from 'react'

export function usePageTitle(title: string) {
  useEffect(() => {
    document.title = `${title} | WishLuck Support and Shopping Ideas (Unofficial Concept)`
  }, [title])
}
