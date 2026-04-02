import { getClient } from '@/lib/drupal-client'
import { Metadata } from 'next'
import { GET_CLASSES } from '@/lib/queries'
import { ClassesData } from '@/lib/types'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ClassCard from '../components/ClassCard'

export const revalidate = 3600
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Classes | Iron Peak Fitness',
  description: 'Browse our world-class fitness classes at Iron Peak Fitness.',
}

async function getClasses() {
  try {
    const client = getClient()
    const data = await client.raw(GET_CLASSES, { first: 50 })
    return data?.nodeClasses?.nodes || []
  } catch (error) {
    console.error('Error fetching classes:', error)
    return []
  }
}

export default async function ClassesPage() {
  const items = await getClasses()

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <section
        className="relative overflow-hidden"
        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0 100%)' }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary-800 via-primary-900 to-primary-950" />
        <div
          className="absolute top-0 right-0 w-1/3 h-full bg-accent-400/10"
          style={{ clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 0 100%)' }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 pb-32 md:pb-40">
          <div className="text-center">
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white uppercase tracking-tight mb-6">
              Classes
            </h1>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
              From high-intensity circuits to restorative yoga, find the class that pushes your limits.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 -mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="font-display text-2xl font-semibold text-gray-600 uppercase mb-2">No Classes Yet</h2>
              <p className="text-gray-500">
                Classes will appear here once content is imported.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {items.map((item: any) => (
                <ClassCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
