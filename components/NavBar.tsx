import Link from 'next/link'
import styles from '../styles/Home.module.css'
import { ConnectWallet } from '@thirdweb-dev/react'

const Navbar = () => {
    return (
        <div className={styles.navbar}>
            <div className={styles.logo}>
                <ConnectWallet />
            </div>
            <div className={styles.menus}>
                <div>
                    {' '}
                    <Link href="/">Gallery NFTs</Link>
                </div>
                <div>
                    {' '}
                    <Link href="/likes">Likes NFTs</Link>
                </div>
                <div>
                    {' '}
                    <Link href="/bestNft">Top NFTs</Link>
                </div>
            </div>
        </div>
    )
}
export default Navbar
