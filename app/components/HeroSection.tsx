'use client'

import Link from 'next/link'
import { DrupalHomepage } from '@/lib/types'

interface HeroSectionProps {
  homepageContent: DrupalHomepage | null | undefined
}

export default function HeroSection({ homepageContent }: HeroSectionProps) {
  const title = (homepageContent as any)?.heroTitle || (homepageContent as any)?.title || 'FORGE YOUR STRONGEST SELF'
  const subtitle = (homepageContent as any)?.heroSubtitle || 'World-class equipment. Expert trainers. Unlimited potential.'
  const description = (homepageContent as any)?.heroDescription?.processed || ''

  return (
    <section
      className="relative overflow-hidden"
      style={{ clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0 100%)' }}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&q=80&fit=crop)',
        }}
      />
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-primary-950/75" />

      {/* Angled Accent Line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-2 bg-accent-400"
        style={{ clipPath: 'polygon(0 0, 100% 50%, 100% 100%, 0 100%)' }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 md:py-40 lg:py-48 text-center">
        <h1 className="font-display text-5xl md:text-6xl lg:text-8xl font-bold text-white uppercase tracking-tight mb-6 leading-none">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto font-light">
            {subtitle}
          </p>
        )}
        {description && (
          <div className="text-lg text-gray-300 max-w-2xl mx-auto mb-8" dangerouslySetInnerHTML={{ __html: description }} />
        )}
        <div className="flex justify-center gap-4 flex-wrap">
          <Link
            href="/classes"
            className="px-8 py-4 bg-accent-400 text-primary-950 rounded-lg hover:bg-accent-300 transition-all duration-200 font-display font-bold text-lg uppercase tracking-wider shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            Start Training
          </Link>
          <Link
            href="/memberships"
            className="px-8 py-4 border-2 border-white text-white rounded-lg hover:bg-white hover:text-primary-950 transition-all duration-200 font-display font-bold text-lg uppercase tracking-wider"
          >
            View Programs
          </Link>
        </div>
      </div>
    </section>
  )
}
