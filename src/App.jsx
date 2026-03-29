import { useState } from 'react'
import './index.css'

// ─── Apps registrados ─────────────────────────────────────────────────────────
// Para adicionar um novo app, inclua um item nesta lista.
const APPS = [
  {
    id: 'mentoria',
    label: 'Mentoria',
    url: 'https://mentoria-app-chi.vercel.app',
    icon: (
      <svg width="17" height="17" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
  },
  {
    id: 'financas',
    label: 'Finanças',
    url: 'https://contas.matheuslouro.com.br',
    icon: (
      <svg width="17" height="17" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
      </svg>
    ),
  },
]

export default function App() {
  const [activeId, setActiveId] = useState(APPS[0].id)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: '#0f172a' }}>

      {/* ── Top Bar ─────────────────────────────────────────────── */}
      <header style={{
        height: '52px',
        background: '#0f172a',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
        gap: '0',
        flexShrink: 0,
      }}>

        {/* Logo ML */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '9px', marginRight: '24px' }}>
          <div style={{
            width: '28px', height: '28px', borderRadius: '7px',
            background: 'white', overflow: 'hidden', flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <img src="/logo.png" alt="ML" style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '2px' }} />
          </div>
          <span style={{ color: '#f1f5f9', fontWeight: 700, fontSize: '13px', letterSpacing: '-0.2px' }}>
            ML<span style={{ color: '#f04e00' }}>.</span>
          </span>
        </div>

        {/* Tabs dos apps */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '2px', flex: 1 }}>
          {APPS.map((app) => {
            const isActive = activeId === app.id
            return (
              <button
                key={app.id}
                onClick={() => setActiveId(app.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '7px',
                  padding: '6px 13px',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontWeight: isActive ? 600 : 400,
                  transition: 'all 0.15s',
                  background: isActive ? '#1e293b' : 'transparent',
                  color: isActive ? '#f1f5f9' : '#475569',
                  outline: 'none',
                }}
              >
                <span style={{ color: isActive ? '#f04e00' : '#475569', lineHeight: 0 }}>
                  {app.icon}
                </span>
                {app.label}
                {isActive && (
                  <span style={{
                    width: '5px', height: '5px', borderRadius: '50%',
                    background: '#f04e00', display: 'inline-block', marginLeft: '1px',
                  }} />
                )}
              </button>
            )
          })}
        </nav>
      </header>

      {/* ── iframes — todos carregam, só um aparece ──────────────── */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        {APPS.map((app) => (
          <iframe
            key={app.id}
            src={app.url}
            title={app.label}
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%',
              border: 'none',
              // mantém carregado mas oculto — troca instantânea entre apps
              opacity: activeId === app.id ? 1 : 0,
              pointerEvents: activeId === app.id ? 'auto' : 'none',
            }}
            allow="camera; microphone; clipboard-write"
          />
        ))}
      </div>

    </div>
  )
}
