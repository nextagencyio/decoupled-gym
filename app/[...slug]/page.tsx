import Header from '../components/Header'
import Footer from '../components/Footer'
import ErrorBoundary from '../components/ErrorBoundary'
import HomepageRenderer from '../components/HomepageRenderer'
import ResponsiveImage from '../components/ResponsiveImage'
import { headers } from 'next/headers'
import { Metadata } from 'next'
import { GET_NODE_BY_PATH } from '@/lib/queries'
import { getServerApolloClient } from '@/lib/apollo-client'

export const revalidate = 300

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const resolvedParams = await params
  const path = `/${(resolvedParams.slug || []).join('/')}`
  try {
    const apollo = getServerApolloClient(await headers())
    const { data } = await apollo.query({ query: GET_NODE_BY_PATH, variables: { path } })
    const title = data?.route?.entity?.title || 'Page'
    return { title }
  } catch {
    return { title: 'Page' }
  }
}

function PageNotFound({ path }: { path: string }) {
  return (
    <div className="text-center py-16">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-primary-500 to-accent-400" />
        <div className="p-12">
          <h1 className="font-display text-2xl font-bold text-gray-900 uppercase tracking-wide mb-4">Page Not Found</h1>
          <p className="text-gray-600 mb-2">We couldn&#39;t find any content at this path.</p>
          <p className="text-sm text-gray-500">Path: {path}</p>
        </div>
      </div>
    </div>
  )
}

export default async function GenericPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const resolvedParams = await params
  const path = `/${(resolvedParams.slug || []).join('/')}`
  const apollo = getServerApolloClient(await headers())

  try {
    const { data } = await apollo.query({ query: GET_NODE_BY_PATH, variables: { path }, fetchPolicy: 'no-cache' })
    const entity = data?.route?.entity

    if (!entity) {
      return (
        <div className="min-h-screen bg-gray-100">
          <Header />
          <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <PageNotFound path={path} />
          </main>
          <Footer />
        </div>
      )
    }

    if (entity.__typename === 'NodeHomepage') {
      return <HomepageRenderer homepageContent={entity} />
    }

    const title = entity.title || 'Untitled'
    const bodyHtml = entity?.body?.processed || ''
    const image = entity?.image

    return (
      <div className="min-h-screen bg-gray-100">
        <Header />

        <section
          className="relative overflow-hidden"
          style={{ clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0 100%)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary-800 via-primary-900 to-primary-950" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 pb-28 md:pb-36">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white uppercase tracking-tight text-center">
              {title}
            </h1>
          </div>
        </section>

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 -mt-12">
          <ErrorBoundary>
            <article className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-primary-500 to-accent-400" />
              {image && (
                <ResponsiveImage
                  image={image}
                  alt={image.alt || title}
                  className="rounded-t-xl"
                  priority={true}
                />
              )}
              <div className="p-6 md:p-8">
                <div className="prose prose-sm sm:prose lg:prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: bodyHtml }} />
              </div>
            </article>
          </ErrorBoundary>
        </main>

        <Footer />
      </div>
    )
  } catch (error) {
    console.error('Error loading page by path:', error)
    return (
      <div className="min-h-screen bg-gray-100">
        <Header />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <PageNotFound path={path} />
        </main>
        <Footer />
      </div>
    )
  }
}
