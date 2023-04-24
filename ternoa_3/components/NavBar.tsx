import Link from 'next/link'
import styles from '../styles/Home.module.css'
import { ConnectWallet } from '@thirdweb-dev/react'
//f
const Navbar = () => {
    return (
        <div className={styles.navbar}>
            <div className={styles.logo}>
                <ConnectWallet />
            </div>
            <div className={styles.menus}>
                <div>
                    {' '}
                    <Link href="/">Gallery Nfts</Link>
                </div>
                <div>
                    {' '}
                    <Link href="/likes">Likes NFTS</Link>
                </div>
                <div>
                    {' '}
                    <Link href="/bestNft">Top NFTs</Link>
                </div>
            </div>
        </div>

        // <div>
        //   <div>
        //     <ul>
        //     <li className={styles.nav}>
        //       <ConnectWallet />
        //     </li>
        //       <li className={styles.nav}>
        //         <Link href="/">Home</Link>
        //       </li>
        //       <li className={styles.nav}>
        //         <Link href="/likes">Likes</Link>
        //       </li>
        //       <li className={styles.nav}>
        //         <Link href="/bestNft">Top Nft</Link>
        //       </li>
        //     </ul>
        //   </div>
        // </div>
    )
}
export default Navbar
