import { MediaRenderer } from '@thirdweb-dev/react'
import styles from '../styles/Home.module.css'
import { GetNfts } from '../hooks/localStorage'

const Likes = () => {
    const { nfts } = GetNfts()

    const renderNft = (nft: string) => {
        return (
            <div className={styles.gridItem} key={nft}>
                <h2 className={styles.titleNft}>{nft}</h2>
                <MediaRenderer
                    src={nfts[nft].image}
                    height="200px"
                    width="200px"
                />
                <p>Number likes: {nfts[nft].addresses.length}</p>
                {nfts[nft].addresses.map((e: string) => (
                    <li className={styles.list} key={e}>
                        {' '}
                        {e}{' '}
                    </li>
                ))}
            </div>
        )
    }

    return (
        <div className={styles.grilleTitle}>
            <h1 className={styles.title}>NFTs likes</h1>

            <p className={styles.description}>
                which addresses have liked each NFT.
            </p>

            <div className={styles.grille}>
                {!nfts ? (
                    <h1>Loading...</h1>
                ) : (
                    Object.keys(nfts).map((nft: string) => {
                        return renderNft(nft)
                    })
                )}
            </div>
        </div>
    )
}
export default Likes
