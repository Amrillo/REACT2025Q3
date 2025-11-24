import dynamic from 'next/dynamic'

const App = dynamic(() => import('../App').then(mod => mod.App), { ssr: false });

export function ClientOnly() {
  return <App />
}

