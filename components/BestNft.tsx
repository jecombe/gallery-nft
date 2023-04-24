import { MediaRenderer } from '@thirdweb-dev/react'
import styles from '../styles/Home.module.css'
import { GetNfts } from '../hooks/localStorage'

const BestNft = () => {
    const { nfts } = GetNfts()

    const renderBest = () => {
        let lgt: number = 1
        return Object.keys(nfts).map((e) => {
            if (nfts[e].addresses.length > lgt) {
                lgt = nfts[e].addresses.length
                return (
                    <>
                        <div className={styles.gallery} key="test">
                            <h2 className={styles.titleNft}>{e}</h2>
                            <MediaRenderer
                                src={nfts[e].image}
                                height="200px"
                                width="200px"
                            />
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
        <div className={styles.grilleTitle}>
            <h1 className={styles.title}>Top Nft like</h1>
            <div className={styles.grille}>{renderBest()}</div>
        </div>
    )
}
export default BestNft
