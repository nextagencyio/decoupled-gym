'use client'

import Link from 'next/link'
import Header from './Header'
import HeroSection from './HeroSection'
import StatsSection from './StatsSection'
import CTASection from './CTASection'
import ErrorBoundary from './ErrorBoundary'
import { DrupalHomepage } from '@/lib/types'
import { Dumbbell, Timer, Users, Heart, Trophy, Zap } from 'lucide-react'

interface HomepageRendererProps {
  homepageContent: DrupalHomepage | null | undefined
}

const whyFeatures = [
  { icon: Dumbbell, title: 'Premium Equipment', description: 'State-of-the-art machines and free weights from top fitness brands.' },
  { icon: Timer, title: 'Flexible Hours', description: 'Open early, close late. Train on your schedule, not ours.' },
  { icon: Users, title: 'Expert Trainers', description: 'Certified professionals dedicated to helping you reach your goals.' },
  { icon: Heart, title: 'Holistic Wellness', description: 'Nutrition guidance, recovery zones, and mental wellness programs.' },
  { icon: Trophy, title: 'Proven Results', description: 'Thousands of success stories from members just like you.' },
  { icon: Zap, title: 'High-Energy Classes', description: '60+ weekly classes from HIIT to yoga, for every fitness level.' },
]

const galleryImages = [
  { src: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&q=80&fit=crop', alt: 'Person working out' },
  { src: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=600&q=80&fit=crop', alt: 'Gym floor' },
  { src: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&q=80&fit=crop', alt: 'Weights area' },
  { src: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=600&q=80&fit=crop', alt: 'Fitness class' },
]

export default function HomepageRenderer({ homepageContent }: HomepageRendererProps) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <ErrorBoundary>
        <HeroSection homepageContent={homepageContent} />
      </ErrorBoundary>

      <ErrorBoundary>
        <StatsSection homepageContent={homepageContent} />
      </ErrorBoundary>

      {/* Featured Programs Section */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-primary-900 uppercase tracking-tight mb-4">
              Our Programs
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              From high-intensity training to mindful movement, find the program that fits your goals.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Strength Training', desc: 'Build muscle and power with our comprehensive strength programs and expert coaching.', href: '/classes' },
              { name: 'HIIT Bootcamp', desc: 'Torch calories and boost endurance with our high-intensity interval training sessions.', href: '/classes' },
              { name: 'Yoga & Recovery', desc: 'Restore balance with guided yoga, stretching, and active recovery classes.', href: '/classes' },
            ].map((program, i) => (
              <Link
                key={i}
                href={program.href}
                className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                {/* Gradient top border */}
                <div className="h-1 bg-gradient-to-r from-primary-500 to-accent-400" />
                <div className="p-8">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center mb-5">
                    {i === 0 && <Dumbbell className="w-7 h-7 text-white" />}
                    {i === 1 && <Zap className="w-7 h-7 text-white" />}
                    {i === 2 && <Heart className="w-7 h-7 text-white" />}
                  </div>
                  <h3 className="font-display text-xl font-bold text-gray-900 uppercase tracking-wide mb-3 group-hover:text-primary-700 transition-colors">
                    {program.name}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{program.desc}</p>
                  <span className="text-primary-700 font-display font-semibold uppercase tracking-wide text-sm group-hover:text-accent-600 transition-colors">
                    Learn More &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Iron Peak Section */}
      <section className="relative py-24 bg-white overflow-hidden">
        {/* Angled top separator */}
        <div
          className="absolute top-0 left-0 right-0 h-20 bg-gray-100"
          style={{ clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 100%)' }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-14">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-primary-900 uppercase tracking-tight mb-4">
              Why Iron Peak
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              More than a gym. A community built on results, support, and pushing limits.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyFeatures.map((feature, i) => {
              const Icon = feature.icon
              return (
                <div key={i} className="text-center p-6 group">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-gray-900 uppercase tracking-wide mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Photo Gallery Section */}
      <section className="relative py-20 bg-gray-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-primary-900 uppercase tracking-tight mb-4">
              Our Facility
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              A peak training environment designed to inspire your best performance.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {galleryImages.map((img, i) => (
              <div
                key={i}
                className="relative group overflow-hidden rounded-xl aspect-square"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url(${img.src})` }}
                />
                {/* Angled overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary-950/70 via-primary-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white font-display font-semibold uppercase tracking-wide text-sm">{img.alt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ErrorBoundary>
        <CTASection homepageContent={homepageContent} />
      </ErrorBoundary>

      {/* Footer with Wave Separator */}
      <div className="relative">
        <svg className="absolute -top-px w-full" viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ height: '60px' }}>
          <path d="M0,0 C480,60 960,60 1440,0 L1440,60 L0,60 Z" className="fill-primary-950" />
        </svg>
        <footer className="bg-primary-950 text-white pt-16 pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="col-span-1 md:col-span-2">
                <h3 className="font-display text-2xl font-bold text-accent-400 uppercase tracking-wider mb-4">
                  Iron Peak Fitness
                </h3>
                <p className="text-gray-400 mb-6 max-w-md leading-relaxed">
                  Elevating fitness standards since 2009. Premium equipment, expert coaching, and a community that pushes you to be your best.
                </p>
                <div className="flex space-x-4">
                  {['Facebook', 'Instagram', 'Twitter'].map((social) => (
                    <a
                      key={social}
                      href="#"
                      className="w-10 h-10 rounded-lg bg-primary-900 flex items-center justify-center hover:bg-accent-400 hover:text-primary-950 transition-colors duration-200 text-sm font-bold"
                    >
                      {social.charAt(0)}
                    </a>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-display font-semibold text-white uppercase tracking-wider mb-4">Quick Links</h4>
                <ul className="space-y-3 text-gray-400">
                  <li><Link href="/classes" className="hover:text-accent-400 transition-colors">Classes</Link></li>
                  <li><Link href="/trainers" className="hover:text-accent-400 transition-colors">Trainers</Link></li>
                  <li><Link href="/memberships" className="hover:text-accent-400 transition-colors">Memberships</Link></li>
                  <li><Link href="/about" className="hover:text-accent-400 transition-colors">About</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-display font-semibold text-white uppercase tracking-wider mb-4">Contact</h4>
                <ul className="space-y-3 text-gray-400">
                  <li>742 Iron Peak Blvd</li>
                  <li>Denver, CO 80202</li>
                  <li>info@ironpeakfitness.com</li>
                  <li>(555) 123-4567</li>
                </ul>
              </div>
            </div>
            <div className="border-t border-primary-800 mt-12 pt-8 text-center text-gray-500 text-sm">
              <p>&copy; {new Date().getFullYear()} Iron Peak Fitness. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
