import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #166534 0%, #14532d 50%, #052e16 100%)', borderRadius: '20%' }}>
        <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="#facc15" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 15.13V8.87a2 2 0 0 1 .56-1.39l4.94-5.04a.5.5 0 0 1 .72.01l4.83 5.03a2 2 0 0 1 .55 1.38v6.27a2 2 0 0 1-.56 1.39l-4.94 5.04a.5.5 0 0 1-.72-.01l-4.83-5.03A2 2 0 0 1 6 15.13z"/>
        </svg>
      </div>
    ),
    { ...size }
  )
}
