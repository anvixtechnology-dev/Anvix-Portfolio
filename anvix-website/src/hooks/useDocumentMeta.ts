import { useEffect } from 'react'

interface PageMeta {
  title: string
  description: string
}

/**
 * Keeps document title and meta description in sync with the active route.
 * Extend this to per-route metadata (OG image, canonical) when sub-pages are added.
 */
export function useDocumentMeta({ title, description }: PageMeta) {
  useEffect(() => {
    document.title = title

    const setMeta = (selector: string, attr: 'name' | 'property', key: string, value: string) => {
      let tag = document.head.querySelector<HTMLMetaElement>(selector)
      if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute(attr, key)
        document.head.appendChild(tag)
      }
      tag.setAttribute('content', value)
    }

    setMeta('meta[name="description"]', 'name', 'description', description)
    setMeta('meta[property="og:title"]', 'property', 'og:title', title)
    setMeta('meta[property="og:description"]', 'property', 'og:description', description)
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title)
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description)
  }, [title, description])
}
