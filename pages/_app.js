import '../styles/globals.css'
import Nav from '../components/Nav'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Nav />
      <main className="container mx-auto p-4">
        <Component {...pageProps} />
      </main>
    </>
  )
}
