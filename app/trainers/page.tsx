import { Metadata } from 'next'
import { headers } from 'next/headers'
import { getServerApolloClient } from '@/lib/apollo-client'
import { GET_TRAINERS } from '@/lib/queries'
import { TrainersData } from '@/lib/types'
import Header from '../components/Header'
import Footer from '../components/Footer'
import TrainerCard from '../components/TrainerCard'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Trainers | Iron Peak Fitness',
  description: 'Meet our expert certified trainers at Iron Peak Fitness.',
}

async function getTrainers() {
  try {
    const requestHeaders = await headers()
    const apolloClient = getServerApolloClient(requestHeaders)
    const { data } = await apolloClient.query<TrainersData>({
      query: GET_TRAINERS,
      variables: { first: 50 },
      fetchPolicy: 'cache-first',
    })
    return data?.nodeTrainers?.nodes || []
  } catch (error) {
    console.error('Error fetching trainers:', error)
    return []
  }
}

export default async function TrainersPage() {
  const items = await getTrainers()

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
              Trainers
            </h1>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
              Meet the certified professionals who will guide you to your fitness goals.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 -mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="font-display text-2xl font-semibold text-gray-600 uppercase mb-2">No Trainers Yet</h2>
              <p className="text-gray-500">
                Trainers will appear here once content is imported.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {items.map((item) => (
                <TrainerCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
