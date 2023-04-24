import Collections from "../components/Collections"
import { Nfts } from "../types/types"

const Home = ({ nfts }: Nfts) => {
  return <Collections nfts={nfts} />
}

export async function getStaticProps() {
  const nfts: Nfts = await fetch(
    "https://eth-mainnet.g.alchemy.com/nft/v2/I3Yjrcvtv7fRyyShkDifeoIGKl-Z6pwc/getNFTsForCollection?contractAddress=0xb003ce92f3b2a8f3dd99207c351eaf05bc605262&withMetadata=true"
  ).then((res) => res.json())
  return {
    props: {
      nfts: nfts.nfts,
    },
  }
}

export default Home
