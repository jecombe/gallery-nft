import { MediaRenderer } from '@thirdweb-dev/react'
import styles from '../styles/Home.module.css'
import { GetNfts } from '../hooks/localStorage'

const BestNft = () => {
    const { nfts } = GetNfts()

    const renderBest = () => {
        let length: number = 1
        return Object.keys(nfts).map((e) => {
            if (nfts[e].addresses.length > length) {
                length = nfts[e].addresses.length
                return (
                    <>
                        <div className={styles.card} key="card">
                            <h2 className={styles.titleNft}>{e}</h2>

                            <MediaRenderer src={nfts[e].image} />

                            <p>Number likes: {nfts[e].addresses.length}</p>

                            {nfts[e].addresses.map((e) => (
                                <li className={styles.list} key={e}>
                                    {' '}
                                    {e}{' '}
                                </li>
                            ))}
                        </div>
                    </>
                )
            }
        })
    }

    return (
        <>
            <h1 className={styles.title}>Top Nft like</h1>
            <div className={styles.cards}>{renderBest()}</div>
        </>
    )
}
export default BestNft
