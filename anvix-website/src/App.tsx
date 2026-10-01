import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Home } from '@/pages/Home'
import '@/styles/globals.css'

const container = document.getElementById('root')

if (!container) {
  throw new Error('Root element #root was not found in index.html')
}

createRoot(container).render(
  <StrictMode>
    <Home />
  </StrictMode>,
)
