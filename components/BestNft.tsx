import { MediaRenderer } from '@thirdweb-dev/react'
import styles from '../styles/Home.module.css'
import { GetNfts } from '../hooks/localStorage'
import { LikeStorage } from '../utils/types'

const BestNft = () => {
    const { nftsStorage }: { nftsStorage: LikeStorage } = GetNfts()

    const renderBest = () => {
        let length: number = 1
        return Object.keys(nftsStorage).map((e: string) => {
            if (nftsStorage[e].addresses.length > length) {
                length = nftsStorage[e].addresses.length
                return (
                    <>
                        <div className={styles.card} key="card">
                            <h2 className={styles.titleNft}>{e}</h2>

                            <MediaRenderer src={nftsStorage[e].image} />

                            <p>
                                Number likes: {nftsStorage[e].addresses.length}
                            </p>

                            {nftsStorage[e].addresses.map(
                                (e: string, index: number) => (
                                    <li className={styles.list} key={index}>
                                        {' '}
                                        {e}{' '}
                                    </li>
                                )
                            )}
                        </div>
                    </>
                )
            }
        })
    }

    return (
        <>
            <h1 className={styles.title}>Top Nft like</h1>
            <p className={styles.description}>List of most popular NFT</p>
            <div className={styles.cards}>{renderBest()}</div>
        </>
    )
}
export default BestNft
