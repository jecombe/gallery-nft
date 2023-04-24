import { MediaRenderer } from '@thirdweb-dev/react'
import styles from '../styles/Home.module.css'
import { GetNfts } from '../hooks/localStorage'

const Likes = () => {
    const { nfts } = GetNfts()

    const renderNft = (nft: string) => {
        return (
            <div className={styles.card} key={nft}>
                <h2 className={styles.titleNft}>{nft}</h2>
                <MediaRenderer src={nfts[nft].image} />
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
        <>
            <h1 className={styles.title}>NFTs likes</h1>

            <p className={styles.description}>NFTs likes by peoples</p>

            <div className={styles.cards}>
                {!nfts ? (
                    <h1>Loading...</h1>
                ) : (
                    Object.keys(nfts).map((nft: string) => {
                        return renderNft(nft)
                    })
                )}
            </div>
        </>
    )
}
export default Likes
