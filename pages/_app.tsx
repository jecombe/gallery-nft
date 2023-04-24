import type { AppProps } from "next/app"
import { ThirdwebProvider } from "@thirdweb-dev/react"
import "../styles/globals.css"
import Layout from "../components/Layout"

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const activeChain = "ethereum"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider activeChain={activeChain}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThirdwebProvider>
  )
}

export default MyApp
