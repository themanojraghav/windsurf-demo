import Header from '@/components/header'
import Footer from '@/components/footer'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ShopMart - Your Online Shopping Destination',
  description: 'Find the best products at affordable prices on ShopMart',
}

export default function HomeLayout({
  children,
}: {
  readonly children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  )
}
