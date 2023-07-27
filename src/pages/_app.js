import '@/styles/globals.css'
import HeaderLayout from './layout/HeaderLayout'

export default function App({ Component, pageProps }) {
  return (
    <><HeaderLayout /><Component {...pageProps} /></>
  )
}
